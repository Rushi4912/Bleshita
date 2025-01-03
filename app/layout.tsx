// app/layout.tsx
import React, { ReactNode } from 'react';
import Navbar from './components/Navbar';
import './globals.css'; // Import global styles here

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        {/* Optionally, you can add a footer */}
      </body>
    </html>
  );
};

export default Layout;
