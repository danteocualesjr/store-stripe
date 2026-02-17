import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

const toys = [
  { id: 'rubiks-cube', name: "Rubik's Cube", description: 'The classic 3×3 color puzzle that defined a generation. Can you solve it?', price: 1499 },
  { id: 'he-man', name: 'He-Man Action Figure', description: 'By the power of Grayskull! The most powerful man in the universe is here.', price: 2499 },
  { id: 'transformers', name: 'Optimus Prime', description: 'Robots in disguise! Transforms from mighty truck to heroic Autobot leader.', price: 3499 },
  { id: 'pac-man', name: 'Pac-Man Tabletop', description: 'Waka waka waka! Bring the arcade home with this tabletop edition.', price: 14999 },
  { id: 'my-little-pony', name: 'My Little Pony Set', description: 'Friendship is magic — even in 1984. Collect all the ponies!', price: 1999 },
  { id: 'speak-and-spell', name: 'Speak & Spell', description: 'The electronic learning toy that helped E.T. phone home. Learn while you play!', price: 2999 },
  { id: 'atari-2600', name: 'Atari 2600 Console', description: 'Have you played Atari today? The legendary home console with wood-grain paneling.', price: 8999 },
  { id: 'cabbage-patch', name: 'Cabbage Patch Doll', description: 'The doll with adoption papers! Every one is unique. Adopt yours today.', price: 3999 },
  { id: 'gi-joe', name: 'G.I. Joe: Snake Eyes', description: 'Yo Joe! The silent ninja commando comes with accessories galore.', price: 1999 },
];

export async function POST() {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey || apiKey.startsWith('sk_test_...') || apiKey.startsWith('sk_live_...')) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY is not configured in .env.local' },
      { status: 400 },
    );
  }

  const stripe = new Stripe(apiKey, { apiVersion: '2025-01-27.acacia' });

  const results = [];

  for (const toy of toys) {
    const product = await stripe.products.create({
      name: toy.name,
      description: toy.description,
      metadata: { store_id: toy.id },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: toy.price,
      currency: 'usd',
    });

    const link = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
    });

    results.push({
      id: toy.id,
      productId: product.id,
      priceId: price.id,
      paymentLink: link.url,
    });
  }

  // Update products.ts with real Stripe data
  const productsPath = path.join(process.cwd(), 'src', 'data', 'products.ts');
  let src = fs.readFileSync(productsPath, 'utf-8');

  for (const r of results) {
    const idPattern = new RegExp(`(  id: '${r.id}',)`);
    if (idPattern.test(src)) {
      // Only patch if payment link not already set
      if (!src.includes(`paymentLink: '${r.paymentLink}'`)) {
        src = src.replace(
          idPattern,
          `  id: '${r.id}',\n    stripeProductId: '${r.productId}',\n    stripePriceId: '${r.priceId}',\n    paymentLink: '${r.paymentLink}',`,
        );
      }
    }
  }

  fs.writeFileSync(productsPath, src, 'utf-8');

  return NextResponse.json({ success: true, products: results });
}
