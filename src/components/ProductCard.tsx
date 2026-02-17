'use client';

import { Product } from '@/data/products';

const cfg = {
  pink: {
    border: 'neon-border-pink',
    text: 'neon-pink',
    badge: 'text-pink-300 border-pink-800',
    hex: '#ff2d78',
    glow: 'rgba(255,45,120,0.18)',
    btnText: 'text-pink-100',
  },
  cyan: {
    border: 'neon-border-cyan',
    text: 'neon-cyan',
    badge: 'text-cyan-300 border-cyan-800',
    hex: '#00f5ff',
    glow: 'rgba(0,245,255,0.18)',
    btnText: 'text-cyan-100',
  },
  yellow: {
    border: 'neon-border-yellow',
    text: 'neon-yellow',
    badge: 'text-yellow-300 border-yellow-800',
    hex: '#ffe600',
    glow: 'rgba(255,230,0,0.18)',
    btnText: 'text-yellow-100',
  },
  purple: {
    border: 'neon-border-purple',
    text: 'neon-purple',
    badge: 'text-purple-300 border-purple-800',
    hex: '#bf00ff',
    glow: 'rgba(191,0,255,0.18)',
    btnText: 'text-purple-100',
  },
  green: {
    border: 'neon-border-green',
    text: 'neon-green',
    badge: 'text-green-300 border-green-800',
    hex: '#39ff14',
    glow: 'rgba(57,255,20,0.18)',
    btnText: 'text-green-100',
  },
} as const;

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const c = cfg[product.neonColor];
  const isSoldOut = product.badge === 'SOLD OUT';

  return (
    <div
      className={`product-card rounded-2xl flex flex-col ${c.border}`}
      style={{
        background: `linear-gradient(160deg, rgba(255,255,255,0.04) 0%, #0c0c2a 40%)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${c.hex}22`,
      }}
    >
      {/* ── Top accent bar ──────────────────────────────── */}
      <div
        className="h-[3px] w-full rounded-t-2xl flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c.hex} 40%, ${c.hex} 60%, transparent 100%)`,
          boxShadow: `0 0 14px 2px ${c.hex}99`,
        }}
      />

      {/* ── Emoji zone ──────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center pt-7 pb-4 flex-shrink-0"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 50% 60%, ${c.glow} 0%, transparent 75%)`,
        }}
      >
        {/* Diagonal ribbon badge */}
        {product.badge && (
          <div className="absolute top-0 right-0 overflow-hidden rounded-tr-2xl" style={{ width: 72, height: 72 }}>
            <span
              className={`badge-ribbon border ${c.badge}`}
              style={{
                background: `${c.hex}18`,
                boxShadow: `0 0 8px ${c.hex}55`,
              }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Glowing ring + emoji */}
        <div className="relative flex items-center justify-center">
          {/* Outer blur halo */}
          <div
            className="absolute rounded-full"
            style={{
              width: 96,
              height: 96,
              background: `radial-gradient(circle, ${c.hex}40 0%, transparent 70%)`,
              filter: 'blur(12px)',
            }}
          />
          {/* Visible ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 80,
              height: 80,
              border: `1px solid ${c.hex}55`,
              boxShadow: `0 0 10px ${c.hex}44, inset 0 0 10px ${c.hex}22`,
            }}
          />
          {/* Emoji */}
          <span className="relative z-10 text-6xl leading-none select-none"
            style={{ filter: `drop-shadow(0 0 10px ${c.hex}88)` }}
          >
            {product.emoji}
          </span>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2 px-5 pb-5 flex-1">

        {/* Category pill */}
        <div className="flex justify-center">
          <span
            className={`font-pixel text-[6px] px-2.5 py-1 rounded-full border tracking-[0.15em] uppercase ${c.badge}`}
            style={{ background: `${c.hex}0f` }}
          >
            {product.category}
          </span>
        </div>

        {/* Product name */}
        <h3
          className="font-vt text-center text-white leading-tight"
          style={{
            fontSize: '1.75rem',
            textShadow: `0 0 20px ${c.hex}33`,
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-vt text-gray-400 text-[1.125rem] leading-snug text-center flex-1">
          {product.description}
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mt-1"
          style={{ background: `linear-gradient(90deg, transparent, ${c.hex}44, transparent)` }}
        />

        {/* Price row */}
        <div className="flex items-center justify-center gap-2 mt-1">
          <span
            className={`font-pixel text-lg ${c.text}`}
          >
            ${(product.price / 100).toFixed(2)}
          </span>
          <span className="font-pixel text-[7px] text-gray-600">USD</span>
        </div>

        {/* CTA — full width */}
        {product.paymentLink && !isSoldOut ? (
          <a
            href={product.paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-buy mt-1 w-full text-center font-pixel text-[9px] py-3 rounded-xl transition-all duration-200 ${c.border} ${c.btnText} hover:scale-[1.02] active:scale-[0.98]`}
            style={{
              background: `linear-gradient(135deg, ${c.hex}18 0%, ${c.hex}08 100%)`,
            }}
          >
            BUY NOW →
          </a>
        ) : (
          <button
            disabled
            className="mt-1 w-full font-pixel text-[9px] py-3 rounded-xl border border-gray-800 text-gray-700 cursor-not-allowed"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            {isSoldOut ? '✕ SOLD OUT' : 'COMING SOON'}
          </button>
        )}
      </div>
    </div>
  );
}
