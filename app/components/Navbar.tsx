"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useCart } from "../../app/utils/cartContext";
import CartSidebar from "../../app/components/CartSidebar";
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false); 
  const [isDropdownOpen, setDropdownOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const { cartItems } = useCart(); 
  const router = useRouter();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);

  const handleDropdownToggle = () => setDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleSearchClick = () => {
    router.push('/search');
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-white shadow-md w-full top-0 z-50 fixed">
      {/* Banner - h-8 */}
      <div className="bg-indigo-600 text-white text-center py-2 h-8">
        <p className="text-sm">🎁 Holiday Sale: Get 25% Off Sitewide! Use code HOLIDAY25 🎁</p>
      </div>

      {/* Main Navbar - h-16 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-16">
        <div className="flex items-center justify-between relative">
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
            <FiMenu size={24} />
          </button>

          {/* Left Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex space-x-8 w-1/3">
            <Link href="/women" className="text-gray-700 hover:text-black">
              Women
            </Link>
            <Link href="/men" className="text-gray-700 hover:text-black">
              Men
            </Link>
            <Link href="/new-arrivals" className="text-gray-700 hover:text-black">
              New Arrivals
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-black">
              About
            </Link>
          </nav>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-xl font-semibold text-black tracking-widest uppercase">
              <a href="/">Bleshita</a>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 w-1/3 justify-end">
            {/* Search Icon */}
            <AiOutlineSearch 
              className="text-gray-700 hover:text-black w-5 h-5 cursor-pointer" 
              onClick={handleSearchClick}
            />

            {/* Sign In/Sign Up Icon */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="text-gray-700 hover:text-black relative"
              >
                <AiOutlineUser className="w-5 h-5" />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-8 right-0 bg-white border border-gray-200 shadow-lg rounded-md py-2 w-40 z-50">
                  <Link
                    href="/api/auth/signin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black text-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative text-gray-700 hover:text-black"
            >
              <AiOutlineShoppingCart className="w-5 h-5" />
              {/* Cart Item Count Badge */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 overflow-y-auto">
            {/* Close button */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <span className="font-semibold">Menu</span>
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="px-4 py-2">
              {/* Main Categories */}
              <div className="py-2 border-b border-gray-200">
                <Link 
                  href="/women" 
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={toggleMobileMenu}
                >
                  Women
                </Link>
                <Link 
                  href="/men" 
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={toggleMobileMenu}
                >
                  Men
                </Link>
                <Link 
                  href="/new-arrivals" 
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={toggleMobileMenu}
                >
                  New Arrivals
                </Link>
                <Link 
                  href="/about" 
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
              </div>

              {/* Shop Categories */}
              <div className="py-2">
                <h3 className="text-sm font-semibold text-gray-900 py-2">Shop Categories</h3>
                {[
                  ['Holiday Gifting', '/holiday-gifting'],
                  ['New Arrivals', '/new-arrivals'],
                  ['Cult Favourites', '/cult-favourites'],
                  ['Pants', '/pants'],
                  ['Jeans', '/jeans'],
                  ['Tees', '/tees'],
                  ['Sweaters', '/sweaters'],
                  ['Outerwear', '/outerwear'],
                  ['Shoes', '/shoes'],
                  ['Accessories', '/accessories'],
                ].map(([title, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block py-2 text-gray-600 hover:text-gray-900"
                    onClick={toggleMobileMenu}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />

      {/* Separator Line */}
      <div className="border-t border-gray-200" />

      {/* Categories Navbar - h-10 */}
      <div className="bg-gray-100 py-2.5 hidden md:block h-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            <Link href="/holiday-gifting" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Holiday Gifting
            </Link>
            <Link href="/new-arrivals" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              New Arrivals
            </Link>
            <Link href="/cult-favourites" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Cult Favourites
            </Link>
            <Link href="/pants" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Pants
            </Link>
            <Link href="/jeans" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Jeans
            </Link>
            <Link href="/tees" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Tees
            </Link>
            <Link href="/sweaters" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Sweaters
            </Link>
            <Link href="/outerwear" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Outerwear
            </Link>
            <Link href="/shoes" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Shoes
            </Link>
            <Link href="/accessories" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">
              Accessories
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
