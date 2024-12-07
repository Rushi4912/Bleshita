// app/utils/api.ts

interface Product {
    id: number;
    title: string;
    price: string;
    imageUrl: string;
  }
  
  export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await fetch(`/api/products?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  };
  