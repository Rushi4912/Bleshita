"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/app/components/Footer";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageGallery: string[];
  colors: string[];
  sizes: string[];
  modelInfo: string;
};

const ProductPage: React.FC = () => {
  const { id } = useParams() as { id: string }; // Explicitly type the id
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/products?id=${id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.data);
          setSelectedColor(data.data.colors[0] || "");
          setSelectedSize(data.data.sizes[0] || "");
        } else {
          console.error("Failed to fetch product:", data.error);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
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
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl font-medium mt-2">₹ {product.price}</p>
          {/* Rest of the content remains unchanged */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
