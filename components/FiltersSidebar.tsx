"use client";

import React, { useState, useEffect } from "react";

const FiltersSidebar: React.FC = () => {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  // Persist the filter states between refreshes
  useEffect(() => {
    const savedSizeState = localStorage.getItem("sizeOpen");
    const savedColorState = localStorage.getItem("colorOpen");
    setSizeOpen(savedSizeState === "true");
    setColorOpen(savedColorState === "true");
  }, []);

  const toggleSizeOpen = () => {
    const newState = !sizeOpen;
    setSizeOpen(newState);
    localStorage.setItem("sizeOpen", newState.toString());
  };

  const toggleColorOpen = () => {
    const newState = !colorOpen;
    setColorOpen(newState);
    localStorage.setItem("colorOpen", newState.toString());
  };

  // Color options with 9 colors
  const colorOptions = [
    "Black", "White", "Brown", "Blue", "grey", "Red", "Purple", "pink", "tan"
  ];

  return (
    <div className="h-screen w-1/6  p-5 flex flex-col space-y-8 fixed  ">
      {/* Size Filter */}
      <div>
        <button
          onClick={toggleSizeOpen}
          className="w-full flex justify-between text-left text-lg font-medium text-gray-700 hover:text-black mr-2" 
        >
          Size
          <span>{sizeOpen ? "-" : "+"}</span>
        </button>
        {sizeOpen && (
          <div className="mt-4 grid grid-cols-3 gap-3 ">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="py-2 px-4 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black "
              >
                {size}
                
              </button>
              
            ))}
          </div>
        )}
        <hr className="border-gray-500 border-1 mt-2 "/>
      </div>

      {/* Color Filter */}
      <div>
        <button
          onClick={toggleColorOpen}
          className="w-full flex justify-between text-left text-lg font-medium text-gray-700 hover:text-black"
        >
          Color
          <span>{colorOpen ? "-" : "+"}</span>
        </button>
        {colorOpen && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {colorOptions.map((color) => (
              <button
                key={color}
                className="flex items-center justify-center text-gray-600 hover:text-black hover:font-semibold"
              >
                <span
                  className={`w-8 h-8 rounded-full border border-gray-300`}
                  style={{ backgroundColor: color.toLowerCase() }}
                ></span>
              </button>
            ))}
          </div>
        )}
                <hr className="border-gray-500 border-1 mt-2 "/>

      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">Price</h3>
        <div className="mt-4 flex flex-col space-y-3">
          {["Under $50", "$50 - $100", "$100 - $200", "Over $200"].map((price) => (
            <button
              key={price}
              className="text-gray-600 hover:text-black hover:font-semibold"
            >
              {price}
            </button>
          ))}
        </div>
      </div>
      <hr className="border-gray-500 border-1 mt-2 "/>
    </div>
  );
};

export default FiltersSidebar;
