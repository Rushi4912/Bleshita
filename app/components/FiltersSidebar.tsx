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
    <div className="p-4">
      {/* Category Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h3 className="text-md font-semibold text-black">Category</h3>
          {openSections.category ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.category && (
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li onClick={() => setFilter("all")} className="cursor-pointer">
              All Categories
            </li>
            <li onClick={() => setFilter("women")} className="cursor-pointer">
              Women
            </li>
            <li onClick={() => setFilter("men")} className="cursor-pointer">
              Men
            </li>
            <li onClick={() => setFilter("new-arrivals")} className="cursor-pointer">
              New Arrivals
            </li>
          </ul>
        )}
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("size")}
        >
          <h3 className="text-md font-semibold text-black">Size</h3>
          {openSections.size ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.size && (
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li>S</li>
            <li>M</li>
            <li>L</li>
            <li>XL</li>
          </ul>
        )}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <h3 className="text-md font-semibold text-black">Color</h3>
          {openSections.color ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.color && (
          <div className="flex mt-2 space-x-2">
            <div className="w-5 h-5 rounded-full bg-black"></div>
            <div className="w-5 h-5 rounded-full bg-red-500"></div>
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
            <div className="w-5 h-5 rounded-full bg-gray-500"></div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="text-md font-semibold text-black">Price</h3>
          {openSections.price ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {openSections.price && (
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li>Under $50</li>
            <li>$50 - $100</li>
            <li>$100 - $200</li>
            <li>$200+</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default FiltersSidebar;
