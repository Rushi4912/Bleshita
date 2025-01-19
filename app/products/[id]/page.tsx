"use client";

import React, { useState, useEffect } from "react";
import {useParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { useCart } from '@/app/utils/cartContext';

type Product = {
  _id: string;
  name: string;
  price: number;
  imageGallery: string[];
  colors: string[];
  sizes: string[];
  modelInfo: string;
  imageUrl: string;
};

const ProductPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { addToCart } = useCart();

  // Early return if ID is invalid
  if (!id || id === 'undefined' || id === 'installHook.js.map') {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Invalid product ID.</p>
      </div>
    );
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          console.error("No ID provided");
          return;
        }

        // Validate MongoDB ObjectId format (24 characters, hexadecimal)
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        if (!isValidObjectId) {
          console.error("Invalid ID format. Expected a 24-character hexadecimal string.");
          setProduct(null);
          setLoading(false);
          return;
        }

        const apiUrl = `/api/products/id/${id}`;
        console.log("Fetching from URL:", apiUrl);

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server error:", errorData);
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.data);
          if (data.data.colors?.length > 0) {
            setSelectedColor(data.data.colors[0]);
          }
          if (data.data.sizes?.length > 0) {
            setSelectedSize(data.data.sizes[0]);
          }
        } else {
          throw new Error(data.error || "Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );
  }

  const images = product?.imageGallery?.length > 0 
    ? product.imageGallery 
    : [product?.imageUrl];

  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row items-start gap-6 px-6 md:px-16 py-8">
        {/* Image Gallery */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
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

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <p className="text-gray-600">COLOR:</p>
              <span className="uppercase text-black font-medium">{selectedColor}</span>
            </div>
          )}
          {product.colors && product.colors.length > 0 && (
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
          )}

          {/* Size Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <p className="text-gray-600">SIZE:</p>
              <span className="uppercase text-black font-medium">{selectedSize}</span>
            </div>
          )}
          {product.sizes && product.sizes.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size ? "border-black" : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Model Info */}
          <p className="mt-4 text-sm text-gray-500">{product.modelInfo}</p>

          {/* Add to Bag Button */}
          <button
            onClick={() => {
              addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.imageUrl,
                color: selectedColor,
                size: selectedSize,
              });
            }}
            className="w-full mt-6 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800"
          >
            ADD TO BAG
          </button>

          {/* Additional Information */}
          <div className="mt-6 text-sm text-gray-500">
            <p className="font-bold">Shipping Discount</p>
            <p>Reduced rate express shipping on orders over ₹15000.</p>
            <p className="mt-4 font-bold">Holiday Returns</p>
            <p>Return within 45 days of purchase. Duties & taxes are non-refundable.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductPage;
