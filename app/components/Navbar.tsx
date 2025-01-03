"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const handleLinkClick = (link: string) => setActiveLink(link);

  return (
    <header className="bg-white shadow-md w-full top-0 z-50 sticky ">
      {/* Banner */}
      <div className="bg-indigo-600 text-white text-center py-2">
        <p className="text-sm">🎁 Holiday Sale: Get 25% Off Sitewide! Use code HOLIDAY25 🎁</p>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={toggleMobileMenu}
          >
            <FiMenu size={24} />
          </button>

          {/* Main Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className={`text-gray-700 hover:text-black ${activeLink === "women" ? "border-b-2 border-black" : ""}`}
              onClick={() => handleLinkClick("women")}
            >
              Women
            </a>
            <a
              href="#"
              className={`text-gray-700 hover:text-black ${activeLink === "men" ? "border-b-2 border-black" : ""}`}
              onClick={() => handleLinkClick("men")}
            >
              Men
            </a>
            <a
              href="#"
              className={`text-gray-700 hover:text-black ${activeLink === "new-arrivals" ? "border-b-2 border-black" : ""}`}
              onClick={() => handleLinkClick("new-arrivals")}
            >
              New Arrivals
            </a>
            <a
              href="#"
              className={`text-gray-700 hover:text-black ${activeLink === "about" ? "border-b-2 border-black" : ""}`}
              onClick={() => handleLinkClick("about")}
            >
              About
            </a>
          </nav>

          {/* Centered Logo */}
          <div className="flex justify-center flex-grow md:flex-grow-0">
            <div className="text-xl font-semibold text-black tracking-wide mr-10 uppercase text-center">Bleshita</div>
          </div>

          {/* Right: Search and Cart Icons */}
          <div className="flex items-center space-x-6">
            <AiOutlineSearch className="text-gray-700 hover:text-black w-5 h-5" />
            {/* Sign-In Icon */}
            <button className="text-gray-700 hover:text-black hidden md:inline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm-4 2v4h8v-4c0-1.08-.88-2-2-2H8c-1.12 0-2 .92-2 2z" />
              </svg>
            </button>

            <AiOutlineShoppingCart className="text-gray-700 hover:text-black w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-gray-200" />

      {/* Categories Navbar */}
      <div className="bg-gray-100 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            <a href="/holiday-gifting" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Holiday Gifting</a>
            <a href="/new-arrivals" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">New Arrivals</a>
            <a href="/cult-favourites" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Cult Favourites</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Clothing</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Pants</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Jeans</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Tees</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Sweaters</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Outerwear</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Shoes</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline">Accessories</a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex flex-col items-center text-white md:hidden">
          <button
            className="absolute top-4 right-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Close
          </button>
          <nav className="flex flex-col items-center space-y-4 mt-12">
            <div>
              <p className="text-lg font-semibold">Women</p>
              <p className="text-sm">Pants, Jeans, Tees, Sweaters...</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Men</p>
              <p className="text-sm">Pants, Jeans, Tees, Sweaters...</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
