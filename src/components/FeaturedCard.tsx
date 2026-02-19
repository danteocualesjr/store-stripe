'use client';

import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface Props { product: Product }

const colorHex: Record<Product['neonColor'], string> = {
  pink:   '#ff2d78',
  cyan:   '#00f5ff',
  yellow: '#ffe600',
  purple: '#bf00ff',
  green:  '#39ff14',
};

export default function FeaturedCard({ product }: Props) {
  const hex = colorHex[product.neonColor];
  const { addToCart, justAdded } = useCart();
  const isJustAdded = justAdded === product.id;

  return (
    <div
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(12,12,42,0.95) 100%)`,
        border: `1px solid ${hex}44`,
        boxShadow: `0 0 0 1px ${hex}18, 0 20px 60px rgba(0,0,0,0.6), 0 0 80px ${hex}18`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Animated top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${hex}, ${hex}cc, transparent)`,
          boxShadow: `0 0 20px 4px ${hex}99`,
        }}
      />

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 85% 50%, ${hex}14 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">

        {/* Left: emoji + glow */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer pulse ring */}
            <div
              className="absolute rounded-full opacity-30"
              style={{
                inset: -20,
                background: `radial-gradient(circle, ${hex}60 0%, transparent 70%)`,
                filter: 'blur(20px)',
                animation: 'pulse-glow-pink 3s ease-in-out infinite',
              }}
            />
            {/* Ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: -4,
                border: `1px solid ${hex}66`,
                boxShadow: `0 0 16px ${hex}44`,
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: 8,
                border: `1px solid ${hex}33`,
              }}
            />
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 40% 35%, ${hex}22, ${hex}08 60%, transparent)`,
              }}
            >
              <span
                className="text-8xl leading-none select-none"
                style={{ filter: `drop-shadow(0 0 20px ${hex}cc)` }}
              >
                {product.emoji}
              </span>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex flex-col gap-4 flex-1 text-center md:text-left">

          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span
              className="font-pixel text-[7px] px-3 py-1.5 rounded-full tracking-widest uppercase"
              style={{
                color: hex,
                border: `1px solid ${hex}44`,
                background: `${hex}10`,
                boxShadow: `0 0 8px ${hex}30`,
              }}
            >
              ★ FEATURED
            </span>
            <span
              className="font-pixel text-[7px] px-3 py-1.5 rounded-full border border-gray-700/50 text-gray-500 tracking-widest uppercase"
            >
              {product.category}
            </span>
            {product.badge && product.badge !== 'SOLD OUT' && (
              <span
                className="font-pixel text-[7px] px-3 py-1.5 rounded-full tracking-widest uppercase"
                style={{
                  color: hex,
                  border: `1px solid ${hex}33`,
                  background: `${hex}0a`,
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Name */}
          <h2
            className="font-vt text-white leading-tight"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              textShadow: `0 0 30px ${hex}44`,
              letterSpacing: '0.02em',
            }}
          >
            {product.name}
          </h2>

          {/* Description */}
          <p className="font-vt text-gray-300 text-xl md:text-2xl leading-relaxed max-w-lg">
            {product.description}
          </p>

          {/* Price + CTA */}
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 mt-2">
            <div>
              <p className="font-pixel text-[7px] text-gray-600 tracking-widest mb-1">PRICE</p>
              <p
                className="font-pixel text-2xl"
                style={{ color: hex, textShadow: `0 0 14px ${hex}` }}
              >
                ${(product.price / 100).toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => addToCart(product)}
                className="btn-buy font-pixel text-[10px] px-8 py-4 rounded-xl text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  border: `1.5px solid ${isJustAdded ? '#39ff14' : hex}`,
                  background: isJustAdded
                    ? 'linear-gradient(135deg, rgba(57,255,20,0.2), rgba(57,255,20,0.06))'
                    : `linear-gradient(135deg, ${hex}22, ${hex}0a)`,
                  boxShadow: isJustAdded ? '0 0 20px rgba(57,255,20,0.4)' : `0 0 20px ${hex}44`,
                  color: isJustAdded ? '#39ff14' : 'white',
                  transition: 'all 0.25s',
                }}
              >
                {isJustAdded ? '✓ ADDED TO CART!' : `🛒 ADD TO CART — $${(product.price / 100).toFixed(2)}`}
              </button>
              {product.paymentLink && (
                <a
                  href={product.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-pixel text-[8px] px-5 py-4 rounded-xl text-white/30 hover:text-white/60 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  BUY DIRECTLY →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
