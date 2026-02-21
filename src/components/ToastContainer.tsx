'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

interface Toast {
  id: number;
  productId: string;
  exiting: boolean;
}

const colorHex: Record<string, string> = {
  pink:   '#ff2d78',
  cyan:   '#00f5ff',
  yellow: '#ffe600',
  purple: '#bf00ff',
  green:  '#39ff14',
};

const DISMISS_MS = 3200;

export default function ToastContainer() {
  const { justAdded, openCart } = useCart();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);
  const prevJustAdded = useRef<string | null>(null);

  // Fire a new toast whenever justAdded changes to a non-null value
  useEffect(() => {
    if (!justAdded || justAdded === prevJustAdded.current) return;
    prevJustAdded.current = justAdded;

    const id = ++counterRef.current;
    setToasts((t) => [...t, { id, productId: justAdded, exiting: false }]);

    // Begin exit animation slightly before removal
    const exitTimer = setTimeout(() => {
      setToasts((t) => t.map((toast) => toast.id === id ? { ...toast, exiting: true } : toast));
    }, DISMISS_MS);

    const removeTimer = setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, DISMISS_MS + 340);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [justAdded]);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-[60] flex flex-col gap-2.5 items-end"
      aria-live="polite"
      aria-label="Cart notifications"
    >
      {toasts.map((toast) => {
        const product = products.find((p) => p.id === toast.productId);
        if (!product) return null;

        const hex = colorHex[product.neonColor] ?? '#00f5ff';

        return (
          <div
            key={toast.id}
            className={toast.exiting ? 'toast-exit' : 'toast-enter'}
            style={{
              background: 'rgba(8,8,28,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${hex}44`,
              borderRadius: 16,
              boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${hex}14, 0 0 24px ${hex}22`,
              width: 'min(340px, calc(100vw - 32px))',
              overflow: 'hidden',
            }}
          >
            {/* Top accent line */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${hex}, transparent)`,
                boxShadow: `0 0 10px 2px ${hex}88`,
              }}
            />

            <div className="flex items-center gap-3 px-4 py-3">
              {/* Emoji */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl leading-none"
                style={{
                  background: `${hex}14`,
                  border: `1px solid ${hex}30`,
                  filter: `drop-shadow(0 0 8px ${hex}66)`,
                }}
              >
                {product.emoji}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-pixel text-[7px] text-green-400 tracking-wider mb-0.5">
                  ✓ ADDED TO CART
                </p>
                <p
                  className="font-vt text-white leading-tight truncate"
                  style={{ fontSize: '1.2rem' }}
                >
                  {product.name}
                </p>
                <p className="font-pixel text-[7px] mt-0.5" style={{ color: hex }}>
                  ${(product.price / 100).toFixed(2)}
                </p>
              </div>

              {/* View cart CTA */}
              <button
                onClick={() => {
                  setToasts((t) => t.filter((to) => to.id !== toast.id));
                  openCart();
                }}
                className="flex-shrink-0 font-pixel text-[6px] px-3 py-2 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  border: `1px solid ${hex}55`,
                  background: `${hex}12`,
                  color: hex,
                  boxShadow: `0 0 8px ${hex}20`,
                  whiteSpace: 'nowrap',
                }}
              >
                VIEW<br />CART →
              </button>
            </div>

            {/* Progress bar */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `${hex}20`,
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: hex,
                  boxShadow: `0 0 6px ${hex}`,
                  animation: `toastProgress ${DISMISS_MS}ms linear forwards`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
