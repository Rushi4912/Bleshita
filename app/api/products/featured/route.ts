import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/mongodb';
import Product from '../../models/product';

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch 3 random products
    const products = await Product.aggregate([
      { $sample: { size: 3 } }
    ]);

    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      stock: product.stock
    }));

    return NextResponse.json({ 
      success: true, 
      data: formattedProducts 
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 