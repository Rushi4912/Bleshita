"use client";

import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "The Crinkle Long-Sleeve",
    price: 5270,
    imageGallery: [
      "/assets/new/new1.jpeg",
      "/assets/new/new2.jpeg",
      "/assets/new/new3.jpeg",
      "/assets/new/new4.jpeg"
    ],
    colors: ["Black", "Blue", "Beige"],
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    modelInfo: "Model is 5'9\", wearing a size S",
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row items-start gap-6 px-6 md:px-16 py-8">
        {/* Image Gallery */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.imageGallery.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/3 bg-white p-6 shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-black font-serif">{product.name}</h1>
          <p className="text-xl font-medium text-gray-700 mt-2">₹ {product.price}</p>
          <div className="flex items-center gap-2 mt-4">
            <p className="text-gray-600">COLOR:</p>
            <span className="uppercase text-black font-medium">{selectedColor}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{
                  backgroundColor:
                    color.toLowerCase() === "black"
                      ? "#000"
                      : color.toLowerCase() === "blue"
                      ? "#1E3A8A"
                      : "#D1D5DB",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <p className="text-gray-600">SIZE:</p>
            <span className="uppercase text-black font-medium">{selectedSize}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2 text-black">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md text-sm ${
                  selectedSize === size ? "border-black" : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-500">{product.modelInfo}</p>
          <button className="w-full mt-6 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800">
            ADD TO BAG
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <p className="font-bold">Shipping Discount</p>
            <p>Reduced rate express shipping on orders over ₹15000.</p>
            <p className="mt-4 font-bold">Holiday Returns</p>
            <p>Return within 45 days of purchase. Duties & taxes are non-refundable.</p>
          </div>

          <div className="mt-12 text-sm text-gray-600">
          <h2 className="font-bold">If there's one thing we love, it's a matching set, and our Crinkle Knit collection is not to be slept on.</h2>
          <p className="mt-4"> Add some romance to your wardrobe with a deep V. This piece features a relaxed fit, V-neck with a tie front, drapey long sleeves, and a lettuce-edged hem, made in our newest crinkled knit fabric. Bonus Points: Get the matching pants to create your new favorite party set.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductPage;
