import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/mongodb';
import Product from '../../models/product';

// Handle GET request

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    await dbConnect();
    
    const { category } = params;
    
    // Find products by category (case-insensitive)
    const products = await Product.find({
      category: { $regex: new RegExp(category, 'i') }
    }).lean();
    
    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    return NextResponse.json({ 
      success: true, 
      data: formattedProducts 
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}