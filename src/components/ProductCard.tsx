'use client';

import { Product } from '@/data/products';

const borderClasses: Record<Product['neonColor'], string> = {
  pink: 'neon-border-pink',
  cyan: 'neon-border-cyan',
  yellow: 'neon-border-yellow',
  purple: 'neon-border-purple',
  green: 'neon-border-green',
};

const textClasses: Record<Product['neonColor'], string> = {
  pink: 'neon-pink',
  cyan: 'neon-cyan',
  yellow: 'neon-yellow',
  purple: 'neon-purple',
  green: 'neon-green',
};

const badgeBg: Record<Product['neonColor'], string> = {
  pink: 'bg-pink-900/60 text-pink-300',
  cyan: 'bg-cyan-900/60 text-cyan-300',
  yellow: 'bg-yellow-900/60 text-yellow-300',
  purple: 'bg-purple-900/60 text-purple-300',
  green: 'bg-green-900/60 text-green-300',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSoldOut = product.badge === 'SOLD OUT';

  return (
    <div
      className={`product-card relative bg-gray-950/80 rounded-lg p-5 flex flex-col gap-3 ${borderClasses[product.neonColor]}`}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute top-3 right-3 font-pixel text-[7px] px-2 py-1 rounded ${badgeBg[product.neonColor]}`}
        >
          {product.badge}
        </span>
      )}

      {/* Emoji / Icon */}
      <div className="text-5xl mb-1 text-center">{product.emoji}</div>

      {/* Category */}
      <p className={`font-pixel text-[7px] uppercase tracking-widest ${textClasses[product.neonColor]} opacity-70`}>
        {product.category}
      </p>

      {/* Name */}
      <h3 className="font-vt text-2xl text-white leading-tight">{product.name}</h3>

      {/* Description */}
      <p className="font-vt text-gray-400 text-lg leading-snug flex-1">{product.description}</p>

      {/* Price */}
      <div className={`font-pixel text-xl ${textClasses[product.neonColor]}`}>
        ${(product.price / 100).toFixed(2)}
      </div>

      {/* CTA */}
      {product.paymentLink ? (
        <a
          href={product.paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-buy mt-1 block text-center font-pixel text-[9px] py-3 px-4 rounded bg-transparent text-white cursor-pointer ${borderClasses[product.neonColor]} hover:bg-white/5 transition-colors`}
        >
          BUY NOW →
        </a>
      ) : (
        <button
          disabled={isSoldOut}
          className={`mt-1 block w-full text-center font-pixel text-[9px] py-3 px-4 rounded bg-transparent cursor-pointer
            ${isSoldOut
              ? 'border border-gray-700 text-gray-600 cursor-not-allowed'
              : `btn-buy text-white ${borderClasses[product.neonColor]} hover:bg-white/5 transition-colors`
            }`}
        >
          {isSoldOut ? 'SOLD OUT' : 'COMING SOON'}
        </button>
      )}
    </div>
  );
}
