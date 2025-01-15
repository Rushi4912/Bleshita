"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/app/components/ProductGrid";
import FiltersSidebar from "@/app/components/FiltersSidebar";

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState<string>("all");
  const [showProducts, setShowProducts] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`/api/products?category=${category}`);
        const response = await fetch(`/api/products/${category}`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products:", data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
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

  return (
    <div className="flex bg-white min-h-screen">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-1/5">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-white">
          <FiltersSidebar setFilter={setFilter} currentFilter={filter} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold capitalize">{category}</h1>
          <p className="mt-2 text-gray-600">
            Discover our latest {category} collection, curated for style and comfort.
          </p>
        </header>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts.slice(0, showProducts)} />

        {/* Load More Button */}
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
      </main>
    </div>
  );
};

export default CategoryPage;
