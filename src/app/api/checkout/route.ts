import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface LineItem {
  priceId?: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey || apiKey.startsWith('sk_')) {
    // No real key — tell the client to fall back to payment links
    return NextResponse.json({ error: 'no_key' }, { status: 400 });
  }

  const stripe = new Stripe(apiKey, { apiVersion: '2025-01-27.acacia' });

  const body = await req.json() as { items: LineItem[] };
  const validItems = body.items.filter((i) => i.priceId);

  if (validItems.length === 0) {
    return NextResponse.json({ error: 'no_items' }, { status: 400 });
  }

  const origin = req.headers.get('origin') ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: validItems.map((i) => ({
      price: i.priceId!,
      quantity: i.quantity,
    })),
    success_url: `${origin}/?checkout=success`,
    cancel_url: `${origin}/?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
