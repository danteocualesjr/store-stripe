'use client';

import { CartProvider } from '@/context/CartContext';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
