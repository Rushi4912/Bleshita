"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/app/components/ProductGrid";
import Filters from "../components/Filters";
import MobileFilters from '@/app/components/MobileFilters';
import { FiFilter } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [showProducts, setShowProducts] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!category) {
          throw new Error("Category is required");
        }

        const categoryString = Array.isArray(category) ? category[0] : category;
        console.log('Fetching products for category:', categoryString);
        
        const response = await fetch(`/api/products/${categoryString}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data); // Debug log
        
        if (data.success) {
          setProducts(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Total navbar height is 8 + 16 + 10 = 34 (136px) */}
      <div className="pt-[136px]"> {/* This accounts for the fixed navbar */}
        {/* Mobile Filters Header */}
        <div className="lg:hidden flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center text-gray-700"
          >
            <span className="mr-2">Filters</span>
            <FiFilter size={20} />
          </button>
          <span className="text-gray-500">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Mobile Filters Modal */}
        <MobileFilters
          isOpen={isMobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          setFilter={setFilter}
          currentFilter={filter}
        />

        <div className="flex">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-56 fixed top-[136px] left-8 h-[calc(100vh-136px)] overflow-y-auto bg-white z-[40] shadow-sm rounded-lg">
            <Filters setFilter={setFilter} currentFilter={filter} />
          </aside>

          {/* Main Content Container */}
          <main className="w-full lg:pl-60">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 pt-6">
              <header className="mb-8">
                <h1 className="text-3xl font-semibold capitalize">
                  {Array.isArray(category) ? category[0] : category}
                </h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                  Discover our latest {Array.isArray(category) ? category[0] : category} collection, curated for style and comfort.
                </p>
              </header>
            </div>

            {/* Products Section */}
            <div className="max-w-7xl mx-auto px-0 sm:px-6 pb-16">
              {filteredProducts.length > 0 ? (
                <>
                  <ProductGrid products={filteredProducts.slice(0, showProducts)} />
                  {filteredProducts.length > showProducts && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={() => setShowProducts((prev) => prev + 12)}
                        className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition duration-200"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-gray-500">No products found in this category.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
