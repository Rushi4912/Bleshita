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
    <div className="p-6 bg-white shadow-md  sticky">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2> */}

      {/* Category Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h3 className="text-lg font-semibold text-gray-500">Category</h3>
          {openSections.category ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.category && (
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li
              onClick={() => setFilter("all")}
              className={`cursor-pointer ${
                currentFilter === "all" ? "font-semibold text-black" : ""
              } hover:text-black`}
            >
              All Categories
            </li>
            <li
              onClick={() => setFilter("women")}
              className={`cursor-pointer ${
                currentFilter === "women" ? "font-semibold text-black" : ""
              } hover:text-black`}
            >
              Women
            </li>
            <li
              onClick={() => setFilter("men")}
              className={`cursor-pointer ${
                currentFilter === "men" ? "font-semibold text-black" : ""
              } hover:text-black`}
            >
              Men
            </li>
            <li
              onClick={() => setFilter("new-arrivals")}
              className={`cursor-pointer ${
                currentFilter === "new-arrivals" ? "font-semibold text-black" : ""
              } hover:text-black`}
            >
              New Arrivals
            </li>
          </ul>
        )}
        <hr className="mt-4 border-gray-300" />
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("size")}
        >
          <h3 className="text-lg font-semibold text-gray-700">Size</h3>
          {openSections.size ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.size && (
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li>S</li>
            <li>M</li>
            <li>L</li>
            <li>XL</li>
          </ul>
        )}
        <hr className="mt-4 border-gray-300" />
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <h3 className="text-lg font-semibold text-gray-700">Color</h3>
          {openSections.color ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.color && (
          <div className="flex mt-4 space-x-3">
            <div className="w-5 h-5 rounded-full bg-black border border-gray-300"></div>
            <div className="w-5 h-5 rounded-full bg-red-500 border border-gray-300"></div>
            <div className="w-5 h-5 rounded-full bg-blue-500 border border-gray-300"></div>
            <div className="w-5 h-5 rounded-full bg-gray-500 border border-gray-300"></div>
          </div>
        )}
        <hr className="mt-4 border-gray-300" />
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="text-lg font-semibold text-gray-700">Price</h3>
          {openSections.price ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.price && (
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li>Under $50</li>
            <li>$50 - $100</li>
            <li>$100 - $200</li>
            <li>$200+</li>
          </ul>
        )}
        <hr className="mt-4 border-gray-300" />
      </div>
    </div>
  );
};

export default FiltersSidebar;
