'use client';

import { useState } from 'react';

interface SetupResult {
  id: string;
  productId: string;
  priceId: string;
  paymentLink: string;
}

const toyEmojis: Record<string, string> = {
  'rubiks-cube': '🎲',
  'he-man': '⚔️',
  transformers: '🤖',
  'pac-man': '👾',
  'my-little-pony': '🦄',
  'speak-and-spell': '📟',
  'atari-2600': '🕹️',
  'cabbage-patch': '🧸',
  'gi-joe': '🥷',
};

export default function SetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [results, setResults] = useState<SetupResult[]>([]);
  const [error, setError] = useState('');

  async function runSetup() {
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/setup', { method: 'POST' });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Setup failed');
        setStatus('error');
        return;
      }

      setResults(data.products);
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }

  return (
    <main className="retro-grid min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="font-pixel text-2xl neon-cyan flicker mb-3">STRIPE SETUP</h1>
          <p className="font-vt text-xl text-gray-400">
            Creates all products, prices &amp; payment links in your Stripe account,
            then auto-updates the store.
          </p>
        </div>

        <div className="bg-gray-950/80 neon-border-cyan rounded-lg p-6 mb-6">
          <h2 className="font-pixel text-[9px] text-cyan-400 mb-4">PREREQUISITES</h2>
          <ol className="font-vt text-lg text-gray-300 space-y-2 list-none">
            <li>
              <span className="neon-cyan mr-2">1.</span>
              Open{' '}
              <code className="text-yellow-300 bg-black/40 px-1 rounded">.env.local</code> in the
              project root
            </li>
            <li>
              <span className="neon-cyan mr-2">2.</span>
              Set{' '}
              <code className="text-yellow-300 bg-black/40 px-1 rounded">STRIPE_SECRET_KEY</code>{' '}
              to your key from{' '}
              <a
                href="https://dashboard.stripe.com/apikeys"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-pink underline"
              >
                dashboard.stripe.com/apikeys
              </a>
            </li>
            <li>
              <span className="neon-cyan mr-2">3.</span>
              Restart the dev server (<code className="text-yellow-300 bg-black/40 px-1 rounded">npm run dev</code>)
            </li>
            <li>
              <span className="neon-cyan mr-2">4.</span>
              Click the button below
            </li>
          </ol>
        </div>

        {status === 'idle' && (
          <button
            onClick={runSetup}
            className="btn-buy w-full font-pixel text-[10px] py-4 rounded neon-border-pink bg-transparent text-white hover:bg-white/5 transition-colors"
          >
            CREATE STRIPE PRODUCTS &amp; PAYMENT LINKS →
          </button>
        )}

        {status === 'loading' && (
          <div className="text-center py-6">
            <p className="font-pixel text-[9px] neon-yellow animate-pulse">
              CREATING PRODUCTS IN STRIPE...
            </p>
            <p className="font-vt text-lg text-gray-500 mt-2">
              Creating 9 products, prices, and payment links...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="neon-border-pink bg-pink-950/30 rounded-lg p-5 text-center">
            <p className="font-pixel text-[9px] neon-pink mb-2">ERROR</p>
            <p className="font-vt text-xl text-pink-300">{error}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 font-pixel text-[8px] px-4 py-2 neon-border-cyan rounded text-cyan-300 hover:bg-cyan-900/20 transition-colors"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {status === 'done' && (
          <div className="space-y-4">
            <div className="neon-border-green bg-green-950/20 rounded-lg p-4 text-center">
              <p className="font-pixel text-[9px] neon-green mb-1">SUCCESS!</p>
              <p className="font-vt text-xl text-green-300">
                {results.length} products created &amp; payment links added to the store.
              </p>
              <a
                href="/"
                className="mt-3 inline-block font-pixel text-[8px] px-4 py-2 neon-border-cyan rounded text-cyan-300 hover:bg-cyan-900/20 transition-colors"
              >
                GO TO STORE →
              </a>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {results.map((r) => (
                <div
                  key={r.id}
                  className="bg-black/40 border border-gray-800 rounded p-3 flex items-center justify-between gap-3"
                >
                  <span className="text-2xl">{toyEmojis[r.id]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-pixel text-[7px] text-gray-400 truncate">{r.productId}</p>
                    <p className="font-pixel text-[7px] text-gray-600 truncate">{r.priceId}</p>
                  </div>
                  <a
                    href={r.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-pixel text-[7px] neon-pink hover:underline shrink-0"
                  >
                    LINK →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
