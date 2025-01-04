// app/layout.tsx
import React, { ReactNode } from 'react';
import Navbar from './components/Navbar';
import { CartProvider } from '../app/utils/cartContext';
import './globals.css'; // Import global styles here

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
};

export default Layout;
