"use client";

import { useState, useEffect } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import FiltersSidebar from '../components/FiltersSidebar';
import ProductGrid from '../components/ProductGrid';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [showProducts, setShowProducts] = useState(12);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        fetchProducts(searchQuery);
      } else {
        setProducts([]);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (err) {
      setError('Error fetching products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = filter === "all"
    ? products
    : products.filter((product) => product.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-[136px]">
        {/* Search Bar Section */}
        <div className="max-w-2xl mx-auto px-4 pb-6 pt-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-10 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-gray-800 placeholder-gray-400"
            />
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex">
          {/* Filters Sidebar */}
          {!loading && filteredProducts.length > 0 && (
            <aside className="hidden lg:block w-56 fixed top-[136px] left-8 h-[calc(100vh-136px)] overflow-y-auto bg-white z-[40] shadow-sm rounded-lg">
              <FiltersSidebar setFilter={setFilter} currentFilter={filter} />
            </aside>
          )}

          {/* Main Content Container */}
          <main className={`w-full ${!loading && filteredProducts.length > 0 ? 'lg:pl-60' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 pb-16 pt-4">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : filteredProducts.length === 0 && searchQuery ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found</p>
                </div>
              ) : filteredProducts.length > 0 ? (
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
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}