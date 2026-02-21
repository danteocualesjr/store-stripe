'use client';

import { CartProvider } from '@/context/CartContext';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import ToastContainer from './ToastContainer';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      {children}
      <CartDrawer />
      <ToastContainer />
    </CartProvider>
  );
}
