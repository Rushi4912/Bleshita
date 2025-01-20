"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/app/components/ProductGrid";
import FiltersSidebar from "@/app/components/FiltersSidebar";
import ProductCard from "../components/ProductCard";

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
      {/* Filters Sidebar */}
      <aside className="fixed left-0 top-16 hidden lg:block w-72 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="sticky top-0 pl-12">
          <FiltersSidebar setFilter={setFilter} currentFilter={filter} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold capitalize">
              {Array.isArray(category) ? category[0] : category}
            </h1>
            <p className="mt-2 text-gray-600">
              Discover our latest {Array.isArray(category) ? category[0] : category} collection, curated for style and comfort.
            </p>
          </header>

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
  );
};

export default CategoryPage;
