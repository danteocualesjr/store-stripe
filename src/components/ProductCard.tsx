'use client';

import { Product } from '@/data/products';

const cfg = {
  pink:   { border: 'neon-border-pink',   text: 'neon-pink',   orb: 'orb-pink',   badge: 'bg-pink-950   text-pink-300   border-pink-700',   btnBg: 'rgba(255,45,120,0.08)',   hex: '#ff2d78' },
  cyan:   { border: 'neon-border-cyan',   text: 'neon-cyan',   orb: 'orb-cyan',   badge: 'bg-cyan-950   text-cyan-300   border-cyan-700',   btnBg: 'rgba(0,245,255,0.08)',    hex: '#00f5ff' },
  yellow: { border: 'neon-border-yellow', text: 'neon-yellow', orb: 'orb-yellow', badge: 'bg-yellow-950 text-yellow-300 border-yellow-700', btnBg: 'rgba(255,230,0,0.08)',    hex: '#ffe600' },
  purple: { border: 'neon-border-purple', text: 'neon-purple', orb: 'orb-purple', badge: 'bg-purple-950 text-purple-300 border-purple-700', btnBg: 'rgba(191,0,255,0.08)',    hex: '#bf00ff' },
  green:  { border: 'neon-border-green',  text: 'neon-green',  orb: 'orb-green',  badge: 'bg-green-950  text-green-300  border-green-700',  btnBg: 'rgba(57,255,20,0.08)',    hex: '#39ff14' },
} as const;

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const c = cfg[product.neonColor];
  const isSoldOut = product.badge === 'SOLD OUT';

  return (
    <div className={`product-card rounded-xl flex flex-col gap-0 ${c.border} ${c.orb}`}>

      {/* ── Top accent bar ───────────────────────────────────── */}
      <div
        className="h-1 w-full rounded-t-xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.hex}, transparent)`,
          boxShadow: `0 0 10px ${c.hex}`,
        }}
      />

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5 flex-1 relative overflow-hidden">

        {/* Diagonal ribbon badge */}
        {product.badge && (
          <div className="absolute top-0 right-0 overflow-hidden" style={{ width: 80, height: 80 }}>
            <span
              className={`badge-ribbon ${c.badge} border`}
              style={{ boxShadow: `0 0 6px ${c.hex}44` }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Emoji orb */}
        <div className="flex justify-center mb-1">
          <div
            className="emoji-orb"
            style={{
              background: `radial-gradient(circle, ${c.hex}20 0%, ${c.hex}05 60%, transparent 100%)`,
            }}
          >
            <span className="text-4xl relative z-10 drop-shadow-lg">{product.emoji}</span>
          </div>
        </div>

        {/* Category pill */}
        <div className="flex justify-center">
          <span
            className={`font-pixel text-[6px] px-2 py-1 rounded-full border ${c.badge} tracking-widest uppercase`}
          >
            {product.category}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-vt text-center leading-tight"
          style={{ fontSize: '1.5rem', color: '#fff', letterSpacing: '0.02em' }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-vt text-gray-400 text-lg leading-snug text-center flex-1">
          {product.description}
        </p>

        {/* Divider */}
        <div
          className="h-px w-full my-1"
          style={{ background: `linear-gradient(90deg, transparent, ${c.hex}50, transparent)` }}
        />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          {/* Price */}
          <div className="price-tag">
            <span className={`font-pixel text-base ${c.text}`}>
              ${(product.price / 100).toFixed(2)}
            </span>
          </div>

          {/* Buy / Sold Out button */}
          {product.paymentLink && !isSoldOut ? (
            <a
              href={product.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-buy flex-1 text-center font-pixel text-[8px] py-2.5 px-3 rounded-lg transition-colors ${c.border} text-white hover:bg-white/5`}
              style={{ background: c.btnBg }}
            >
              BUY NOW →
            </a>
          ) : (
            <button
              disabled
              className="flex-1 font-pixel text-[8px] py-2.5 px-3 rounded-lg border border-gray-700 text-gray-600 cursor-not-allowed bg-transparent"
            >
              {isSoldOut ? 'SOLD OUT' : 'COMING SOON'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
