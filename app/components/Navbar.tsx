"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useCart } from "../../app/utils/cartContext";
import CartSidebar from "../../app/components/CartSidebar";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false); // State for cart drawer
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for Sign In/Sign Up dropdown
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown element
  const { cartItems } = useCart(); // Access cart items from context

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);

  const handleDropdownToggle = () => setDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
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
    <header className="bg-white shadow-md w-full top-0 z-50 sticky">
      {/* Banner */}
      <div className="bg-indigo-600 text-white text-center py-2">
        <p className="text-sm">🎁 Holiday Sale: Get 25% Off Sitewide! Use code HOLIDAY25 🎁</p>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Hamburger Menu for Mobile */}
          <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
            <FiMenu size={24} />
          </button>

          {/* Main Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex space-x-8">
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
          <div className="flex justify-center flex-grow md:flex-grow-0">
            <div className="text-xl font-semibold text-black tracking-wide uppercase">
              Bleshita
            </div>
          </div>

          {/* Right: Search, Sign In/Sign Up, and Cart Icons */}
          <div className="flex items-center space-x-6 relative">
            {/* Search Icon */}
            <AiOutlineSearch className="text-gray-700 hover:text-black w-5 h-5 cursor-pointer" />

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

      {/* Cart Drawer */}
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />

      {/* Separator Line */}
      <div className="border-t border-gray-200" />

      {/* Categories Navbar */}
      <div className="bg-gray-100 py-2 hidden md:block">
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
