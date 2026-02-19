'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { Product } from '@/data/products';

/* ── Types ─────────────────────────────────────────────────────────── */
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: string }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'HYDRATE'; items: CartItem[] };

/* ── Reducer ───────────────────────────────────────────────────────── */
function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { product: action.product, quantity: 1 }];
      return { ...state, items, isOpen: true };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'HYDRATE':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

/* ── Context ───────────────────────────────────────────────────────── */
interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  justAdded: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ── Provider ──────────────────────────────────────────────────────── */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pixel-palace-cart');
      if (stored) dispatch({ type: 'HYDRATE', items: JSON.parse(stored) });
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('pixel-palace-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: 'ADD', product });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1200);
  }, []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
        increment: (id) => dispatch({ type: 'INCREMENT', id }),
        decrement: (id) => dispatch({ type: 'DECREMENT', id }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        openCart: () => dispatch({ type: 'OPEN' }),
        closeCart: () => dispatch({ type: 'CLOSE' }),
        justAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────────────────── */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
