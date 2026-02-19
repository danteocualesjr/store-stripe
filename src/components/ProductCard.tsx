'use client';

import { Product } from '@/data/products';

const colorHex: Record<Product['neonColor'], string> = {
  pink:   '#ff2d78',
  cyan:   '#00f5ff',
  yellow: '#ffe600',
  purple: '#bf00ff',
  green:  '#39ff14',
};

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const hex = colorHex[product.neonColor];
  const isSoldOut = product.badge === 'SOLD OUT';

  return (
    <div
      className="product-card relative flex flex-col rounded-2xl overflow-hidden group"
      style={{
        background: 'rgba(10,10,30,0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${hex}30`,
        boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${hex}10`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[2px] w-full flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${hex} 50%, transparent 90%)`,
          boxShadow: `0 0 12px 2px ${hex}88`,
        }}
      />

      {/* Diagonal ribbon */}
      {product.badge && (
        <div
          className="absolute top-0 right-0 overflow-hidden rounded-tr-2xl pointer-events-none"
          style={{ width: 76, height: 76 }}
        >
          <span
            className="badge-ribbon font-pixel border"
            style={{
              background: `${hex}18`,
              color: hex,
              borderColor: `${hex}44`,
              boxShadow: `0 0 8px ${hex}44`,
              fontSize: 6,
            }}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Emoji zone */}
      <div
        className="relative flex items-center justify-center py-8 flex-shrink-0"
        style={{
          background: `radial-gradient(ellipse 65% 85% at 50% 60%, ${hex}15 0%, transparent 75%)`,
        }}
      >
        {/* Glow halo */}
        <div
          className="absolute rounded-full transition-all duration-300"
          style={{
            width: 80, height: 80,
            background: `radial-gradient(circle, ${hex}35 0%, transparent 70%)`,
            filter: 'blur(14px)',
          }}
        />
        {/* Visible ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 74, height: 74,
            border: `1px solid ${hex}44`,
          }}
        />
        {/* Emoji */}
        <span
          className="relative z-10 select-none leading-none"
          style={{
            fontSize: '3.5rem',
            filter: `drop-shadow(0 0 12px ${hex}aa)`,
          }}
        >
          {product.emoji}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-5 pb-5 flex-1">

        {/* Category */}
        <div className="flex justify-center">
          <span
            className="font-pixel tracking-[0.15em] uppercase"
            style={{
              fontSize: 6,
              color: `${hex}cc`,
              padding: '4px 10px',
              borderRadius: 999,
              border: `1px solid ${hex}28`,
              background: `${hex}0c`,
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-vt text-center text-white leading-tight"
          style={{
            fontSize: '1.6rem',
            textShadow: `0 0 24px ${hex}33`,
            letterSpacing: '0.01em',
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="font-vt text-center flex-1 leading-snug"
          style={{ fontSize: '1.05rem', color: 'rgba(180,180,210,0.8)' }}
        >
          {product.description}
        </p>

        {/* Separator */}
        <div
          className="h-px w-full my-1"
          style={{ background: `linear-gradient(90deg, transparent, ${hex}35, transparent)` }}
        />

        {/* Price */}
        <div className="flex items-baseline justify-center gap-1.5 mb-1">
          <span
            className="font-pixel text-xl"
            style={{ color: hex, textShadow: `0 0 12px ${hex}` }}
          >
            ${(product.price / 100).toFixed(2)}
          </span>
          <span className="font-pixel text-[6px] text-gray-700 tracking-widest">USD</span>
        </div>

        {/* CTA */}
        {product.paymentLink && !isSoldOut ? (
          <a
            href={product.paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-buy w-full text-center font-pixel py-3 rounded-xl text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
            style={{
              fontSize: 8,
              border: `1px solid ${hex}55`,
              background: `linear-gradient(135deg, ${hex}1a 0%, ${hex}08 100%)`,
              boxShadow: `0 0 16px ${hex}20`,
            }}
          >
            BUY NOW →
          </a>
        ) : (
          <button
            disabled
            className="w-full font-pixel py-3 rounded-xl cursor-not-allowed"
            style={{
              fontSize: 8,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.3)',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            {isSoldOut ? '✕  SOLD OUT' : 'COMING SOON'}
          </button>
        )}
      </div>
    </div>
  );
}
