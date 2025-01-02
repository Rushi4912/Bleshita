import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
      <Image src={product.imageUrl} alt={product.name} width={300} height={300} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-gray-600">${product.price}</span>
        <span className="text-yellow-500">★ {product.rating}</span>
      </div>
      
      <button className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-all duration-200">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
