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
  'imageGallery: '?: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
  modelInfo: string;
};

// Add new types for reviews
type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
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
        console.log("Fetched product data:", data);
        
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

  // Parse the imageGallery string into an array
  const parseImageGallery = (product: Product | null) => {
    if (!product) return [];
    
    try {
      // Check for the string version of imageGallery
      if (product['imageGallery: ']) {
        return JSON.parse(product['imageGallery: '].replace(/\n/g, ''));
      }
      // Fallback to existing imageGallery array or imageUrl
      return product.imageGallery?.length > 0 
        ? product.imageGallery 
        : product.imageUrl 
        ? [product.imageUrl] 
        : [];
    } catch (error) {
      console.error('Error parsing imageGallery:', error);
      return product.imageUrl ? [product.imageUrl] : [];
    }
  };

  const displayImages = parseImageGallery(product);

  // Add dummy reviews (replace with actual reviews from your database)
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Perfect fit and great quality! Highly recommend.',
      date: '2024-01-15'
    },
    {
      id: '2',
      userName: 'Michael R.',
      rating: 4,
      comment: 'Good product, shipping was fast.',
      date: '2024-01-10'
    },
    // Add more reviews as needed
  ];

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white">
      <div className="pt-[136px]">
        <div className="flex flex-col md:flex-row items-start gap-6 px-6 md:px-16 py-8">
          {/* Image Gallery */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product?.name || 'Product'} - Image ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full object-cover rounded-md"
                  priority={index === 0}
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
                  id: product!._id,
                  name: product!.name,
                  price: product!.price,
                  quantity: 1,
                  image: displayImages[0],
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

        {/* Reviews Section */}
        <div className="px-6 md:px-16 py-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Write a Review Button */}
            <button className="mb-8 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Write a Review
            </button>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{review.userName}</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
