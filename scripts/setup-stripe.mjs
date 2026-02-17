/**
 * Pixel Palace — Stripe Setup Script
 *
 * Creates a Stripe product, price, and payment link for each toy,
 * then writes the payment links back into src/data/products.ts.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe.mjs
 */

import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey || apiKey.startsWith('sk_test_...') || apiKey.startsWith('sk_live_...')) {
  console.error('\n❌  Please set STRIPE_SECRET_KEY before running this script.');
  console.error('    Example: STRIPE_SECRET_KEY=sk_test_xxx node scripts/setup-stripe.mjs\n');
  process.exit(1);
}

const stripe = new Stripe(apiKey, { apiVersion: '2025-01-27.acacia' });

const toys = [
  {
    id: 'rubiks-cube',
    name: "Rubik's Cube",
    description: 'The classic 3×3 color puzzle that defined a generation. Can you solve it?',
    price: 1499,
    emoji: '🎲',
  },
  {
    id: 'he-man',
    name: 'He-Man Action Figure',
    description: 'By the power of Grayskull! The most powerful man in the universe is here.',
    price: 2499,
    emoji: '⚔️',
  },
  {
    id: 'transformers',
    name: 'Optimus Prime',
    description: 'Robots in disguise! Transforms from mighty truck to heroic Autobot leader.',
    price: 3499,
    emoji: '🤖',
  },
  {
    id: 'pac-man',
    name: 'Pac-Man Tabletop',
    description: 'Waka waka waka! Bring the arcade home with this tabletop edition.',
    price: 14999,
    emoji: '👾',
  },
  {
    id: 'my-little-pony',
    name: 'My Little Pony Set',
    description: 'Friendship is magic — even in 1984. Collect all the ponies!',
    price: 1999,
    emoji: '🦄',
  },
  {
    id: 'speak-and-spell',
    name: 'Speak & Spell',
    description: 'The electronic learning toy that helped E.T. phone home. Learn while you play!',
    price: 2999,
    emoji: '📟',
  },
  {
    id: 'atari-2600',
    name: 'Atari 2600 Console',
    description: 'Have you played Atari today? The legendary home console with wood-grain paneling.',
    price: 8999,
    emoji: '🕹️',
  },
  {
    id: 'cabbage-patch',
    name: 'Cabbage Patch Doll',
    description: 'The doll with adoption papers! Every one is unique. Adopt yours today.',
    price: 3999,
    emoji: '🧸',
  },
  {
    id: 'gi-joe',
    name: 'G.I. Joe: Snake Eyes',
    description: 'Yo Joe! The silent ninja commando comes with accessories galore.',
    price: 1999,
    emoji: '🥷',
  },
];

async function main() {
  console.log('\n🕹️  Pixel Palace — Stripe Setup\n');

  // Verify account
  const account = await stripe.accounts.retrieve();
  console.log(`  Connected to: ${account.email || account.id}\n`);
  console.log('Creating products, prices, and payment links...\n');

  const results = [];

  for (const toy of toys) {
    process.stdout.write(`  ${toy.emoji}  ${toy.name}... `);

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

    console.log(`✓`);
    console.log(`      product=${product.id}  price=${price.id}`);
    console.log(`      link=${link.url}`);
  }

  // Patch src/data/products.ts with the real IDs + payment links
  const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
  let src = fs.readFileSync(productsPath, 'utf-8');

  for (const r of results) {
    const idPattern = new RegExp(`(  id: '${r.id}',)`);
    if (idPattern.test(src)) {
      src = src.replace(
        idPattern,
        `  id: '${r.id}',\n    stripeProductId: '${r.productId}',\n    stripePriceId: '${r.priceId}',\n    paymentLink: '${r.paymentLink}',`,
      );
    }
  }

  fs.writeFileSync(productsPath, src, 'utf-8');
  console.log('\n✅  src/data/products.ts updated with Stripe payment links.');
  console.log('    Restart your dev server to see the Buy Now buttons activate.\n');
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
