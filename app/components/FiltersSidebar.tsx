"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

interface FiltersSidebarProps {
  setFilter: (filter: string) => void;
  currentFilter: string;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ setFilter, currentFilter }) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: false,
    size: false,
    color: false,
    price: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-white shadow-lg px-8 py-6 ml-4 z-30">
      <h2 className="text-base font-light text-gray-400">0 Products</h2>
      <hr className="mt-3 border-gray-200" />

      {/* Category Filter */}
      <div className="mb-6 mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h3 className="text-sm font-bold text-black">Category</h3>
          {openSections.category ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.category && (
          <ul className="mt-5 space-y-4 text-[15px] text-gray-600">
            <li
              onClick={() => setFilter("all")}
              className={`cursor-pointer ${
                currentFilter === "all" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              All Categories
            </li>
            <li
              onClick={() => setFilter("women")}
              className={`cursor-pointer ${
                currentFilter === "women" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              Women
            </li>
            <li
              onClick={() => setFilter("men")}
              className={`cursor-pointer ${
                currentFilter === "men" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              Men
            </li>
            <li
              onClick={() => setFilter("denim")}
              className={`cursor-pointer ${
                currentFilter === "denim" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              Denim
            </li>
            <li
              onClick={() => setFilter("sweaters")}
              className={`cursor-pointer ${
                currentFilter === "sweaters" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              Sweaters
            </li>
            <li
              onClick={() => setFilter("tops")}
              className={`cursor-pointer ${
                currentFilter === "tops" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              Tops
            </li>
            <li
              onClick={() => setFilter("outerwear")}
              className={`cursor-pointer ${
                currentFilter === "outerwear" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              Outerwear
            </li>
            <li
              onClick={() => setFilter("bottoms")}
              className={`cursor-pointer ${
                currentFilter === "bottoms" ? "font-semibold text-black" : ""
              } hover:text-black transition-colors`}
            >
              Bottoms
            </li>
          </ul>
        )}
        <hr className="mt-6 border-gray-200" />
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("size")}
        >
          <h3 className="text-sm font-bold text-black">Size</h3>
          {openSections.size ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.size && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="flex items-center justify-center w-8 h-8 border border-gray-200 hover:border-gray-400 cursor-pointer transition-colors rounded text-gray-600 text-xs font-medium hover:bg-gray-50">
                {size}
              </div>
            ))}
          </div>
        )}
        <hr className="mt-4 border-gray-200" />
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <h3 className="text-sm font-bold text-black">Color</h3>
          {openSections.color ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.color && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-black border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Black</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">White</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-gray-500 border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Gray</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-red-500 border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Red</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-blue-500 border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Blue</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-green-500 border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Green</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-yellow-500 border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Yellow</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-purple-500 border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Purple</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-pink-500 border border-gray-200 hover:scale-110 transition-transform cursor-pointer"></div>
              <span className="text-[11px] text-gray-500">Pink</span>
            </div>
          </div>
        )}
        <hr className="mt-4 border-gray-200" />
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="text-sm font-bold text-black">Price</h3>
          {openSections.price ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.price && (
          <ul className="mt-5 space-y-4 text-[15px] text-gray-600">
            <li className="cursor-pointer hover:text-black transition-colors">Under $50</li>
            <li className="cursor-pointer hover:text-black transition-colors">$50 - $100</li>
            <li className="cursor-pointer hover:text-black transition-colors">$100 - $200</li>
            <li className="cursor-pointer hover:text-black transition-colors">$200+</li>
          </ul>
        )}
        <hr className="mt-6 border-gray-200" />
      </div>
    </div>
  );
};

export default FiltersSidebar;
