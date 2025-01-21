"use client";

import { useState, useEffect } from 'react';
import { AiOutlineSearch } from "react-icons/ai";

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

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        fetchProducts(searchQuery);
      } else {
        setProducts([]);
      }
    }, 500); // Wait 500ms after user stops typing

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

  return (
    <div className="min-h-screen bg-white">
      {/* Search Bar Section */}
      <div className="pt-8 pb-6">
        <div className="max-w-2xl mx-auto px-4">
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
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && products.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-md p-4 transition-shadow hover:shadow-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-medium text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="mt-2 text-gray-900 font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}