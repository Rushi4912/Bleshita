"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import FiltersSidebar from "@/components/FiltersSidebar";

const CategoryPage: React.FC = () => {
  const { category } = useParams(); // Dynamically get the category
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState<string>("all");
  const [showProducts, setShowProducts] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/products/${category}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setProducts(data.data);
        } else {
          setError(data.error || "Failed to load products");
        }
      } catch (err: any) {
        setError("Something went wrong while fetching products.");
        console.error("Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  // Filter products
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) =>
          product.category.toLowerCase() === filter.toLowerCase()
        );

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex">
      {/* Filters Sidebar */}
      <aside className="w-1/6 h-screen border-r p-4 ml-10 mr-6 mt-8 relative">
        <FiltersSidebar onFilterChange={(newFilter) => setFilter(newFilter)} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-20 mt-8">
        {/* Banner Section */}
        <section
          className="relative h-64 bg-cover bg-center mb-8"
          style={{
            backgroundImage: `url(/assets/background/hero-${category}.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-4xl font-bold">{category} Collection</h1>
            <p className="mt-4 text-lg">
              Explore our latest and exclusive {category} products designed for
              comfort and style.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <div className="px-4 sm:px-6 lg:px-8">
          <ProductGrid products={filteredProducts.slice(0, showProducts)} />
          <div className="mt-8 text-center">
            {filteredProducts.length > showProducts && (
              <button
                onClick={() => setShowProducts((prev) => prev + 12)}
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
