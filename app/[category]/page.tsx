"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import FiltersSidebar from "@/components/FiltersSidebar";

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState<string>("all");
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(12);

  const mockProducts = [
    { id: 1, name: "Cozy Cashmere Sweater", price: 79.99, imageUrl: "/assets/new/new1.jpeg", rating: 4.5, category: "Sweaters", size: "M", color: "Black" },
    { id: 2, name: "Leather Jacket", price: 199.99, imageUrl: "/assets/new/new2.jpeg", rating: 4.7, category: "Jackets", size: "L", color: "Brown" },
    { id: 3, name: "Comfortable Jeans", price: 59.99, imageUrl: "/assets/new/new3.jpeg", rating: 4.2, category: "Pants", size: "S", color: "Blue" },
    { id: 4, name: "Cozy Cashmere Sweater", price: 79.99, imageUrl: "/assets/new/new4.jpeg", rating: 4.5, category: "Sweaters", size: "M", color: "Black" },
    { id: 5, name: "Leather Jacket", price: 199.99, imageUrl: "/assets/new/new5.jpeg", rating: 4.7, category: "Jackets", size: "L", color: "Brown" },
    { id: 6, name: "Comfortable Jeans", price: 59.99, imageUrl: "/assets/new/new6.jpeg", rating: 4.2, category: "Pants", size: "S", color: "Blue" },
    { id: 7, name: "Cozy Cashmere Sweater", price: 79.99, imageUrl: "/assets/new/new7.jpeg", rating: 4.5, category: "Sweaters", size: "M", color: "Black" },
    { id: 8, name: "Leather Jacket", price: 199.99, imageUrl: "/assets/new/new8.jpeg", rating: 4.7, category: "Jackets", size: "L", color: "Brown" },
    { id: 9, name: "Comfortable Jeans", price: 59.99, imageUrl: "/assets/new/new9.jpeg", rating: 4.2, category: "Pants", size: "S", color: "Blue" },
    { id: 10, name: "Cozy Cashmere Sweater", price: 79.99, imageUrl: "/assets/new/new10.jpeg", rating: 4.5, category: "Sweaters", size: "M", color: "Black" },
    { id: 11, name: "Leather Jacket", price: 199.99, imageUrl: "/assets/new/new12.jpeg", rating: 4.7, category: "Jackets", size: "L", color: "Brown" },
  ];

  const filteredProducts = filter === "all"
  ? mockProducts
  : mockProducts.filter(
      (product) => product.category.toLowerCase() === filter.toLowerCase()
    );

return (
  <div className="bg-gray-100 flex ">
    {/* Filters Sidebar */}
    <aside className="w-1/6 h-screen border-r  p-4 ml-10 mr-6 mt-8 relative">
      <FiltersSidebar />
    </aside>

    {/* Main Content */}
    <main className="flex-1 mr-20 mt-8 ">
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
          <button
            onClick={() => setShowProducts((prev) => prev + 12)}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Load More
          </button>
        </div>
      </div>
    </main>
  </div>
);
};

export default CategoryPage;