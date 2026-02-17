import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import './globals.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pixel Palace — 80s Toy Emporium',
  description:
    'The gnarliest toys this side of the galaxy. Classic 80s toys with Stripe-powered checkout.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body className="scanlines">{children}</body>
    </html>
  );
}
