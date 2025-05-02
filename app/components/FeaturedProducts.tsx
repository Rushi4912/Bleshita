'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products/featured');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-[500px] bg-gray-200 rounded"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light tracking-widest uppercase mb-4 text-gray-900">Featured This Week</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our latest arrivals and timeless essentials</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative h-[500px] w-full mb-4 bg-gray-50">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  width={400} 
                  height={500} 
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-102" 
                />
              </div>
              <div className="px-1 space-y-2">
                <h3 className="text-sm font-normal text-gray-700 tracking-wide">
                  {product.name}
                </h3>
                <span className="text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/new-arrivals" 
            className="inline-block text-sm tracking-widest uppercase border-b border-black hover:opacity-70 transition-opacity text-gray-900"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 