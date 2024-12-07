// types.ts
export interface Collection {
    title: string;
    imageUrl: string;
    buttonText: string;
  }
  
  export interface FeatureCollectionProps {
    title: string;
    description: string;
    collections: Collection[];
  }
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    category: string;
  }