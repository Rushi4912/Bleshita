"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

interface FiltersSidebarProps {
  setFilter: (filter: string) => void;
  currentFilter: string;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ setFilter, currentFilter }) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: true,
    size: false,
    color: false,
    price: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white h-full shadow-sm rounded-lg p-6">
      <h2 className="text-sm font-light text-gray-400 mb-4">0 Products</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h3 className="text-sm font-semibold text-black">Category</h3>
          {openSections.category ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.category && (
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            {["all", "women", "men", "denim", "sweaters", "tops", "outerwear", "bottoms"].map((category) => (
              <li
                key={category}
                onClick={() => setFilter(category)}
                className={`cursor-pointer ${
                  currentFilter === category ? "font-semibold text-black" : ""
                } hover:text-black`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("size")}
        >
          <h3 className="text-sm font-semibold text-black">Size</h3>
          {openSections.size ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.size && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className="flex items-center justify-center w-8 h-8 border border-gray-300 hover:border-gray-400 rounded text-gray-700 text-xs font-medium hover:bg-gray-100 cursor-pointer"
              >
                {size}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <h3 className="text-sm font-semibold text-black">Color</h3>
          {openSections.color ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.color && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { color: "black", bgColor: "bg-black" },
              { color: "white", bgColor: "bg-white border-gray-300" },
              { color: "gray", bgColor: "bg-gray-500" },
              { color: "red", bgColor: "bg-red-500" },
              { color: "blue", bgColor: "bg-blue-500" },
              { color: "green", bgColor: "bg-green-500" },
              { color: "yellow", bgColor: "bg-yellow-500" },
              { color: "purple", bgColor: "bg-purple-500" },
              { color: "pink", bgColor: "bg-pink-500" },
            ].map(({ color, bgColor }) => (
              <div key={color} className="flex flex-col items-center space-y-1">
                <div
                  className={`w-8 h-8 rounded-full ${bgColor} border border-gray-300 hover:scale-110 transition-transform cursor-pointer`}
                ></div>
                <span className="text-xs text-gray-500">{color}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="text-sm font-semibold text-black">Price</h3>
          {openSections.price ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {openSections.price && (
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            {["Under $50", "$50 - $100", "$100 - $200", "$200+"].map((price) => (
              <li key={price} className="cursor-pointer hover:text-black">
                {price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FiltersSidebar;
