// Footer.tsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Horizontally Aligned Sections */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-4 pb-4">
          {/* Account Links */}
          <div className="w-full lg:w-1/4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Login</a></li>
              <li><a href="#" className="hover:underline">Signup</a></li>
              <li><a href="#" className="hover:underline">Redeem a Gift Card</a></li>
            </ul>
          </div>

          {/* About Links */}
          <div className="w-full lg:w-1/4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Sustainability</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="w-full lg:w-1/4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Help</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Size Guide</a></li>
            </ul>
          </div>

          {/* Newsletter - Sign Up (Increased Horizontal Width) */}
          <div className="w-full lg:w-2/5">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Sign Up for Our Newsletter
            </h3>
            <p className="text-base text-gray-600 mb-4">
              Get updates on new arrivals, exclusive discounts, and more. Join us and stay informed!
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-l text-lg focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white rounded-r text-lg font-medium hover:bg-gray-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Social Media and Legal Links */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-6 lg:gap-0">
            
            {/* Social Icons */}
            <div className="flex space-x-4 text-gray-600 text-lg">
              <a href="#" className="hover:text-gray-800"><FaFacebookF /></a>
              <a href="#" className="hover:text-gray-800"><FaTwitter /></a>
              <a href="#" className="hover:text-gray-800"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-800"><FaPinterestP /></a>
              <a href="#" className="hover:text-gray-800"><FaYoutube /></a>
            </div>
            
            {/* Legal Links */}
            <div className="text-sm text-gray-600 space-x-6">
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Accessibility</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Bleshita. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
