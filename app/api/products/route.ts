import { NextResponse } from 'next/server';
import dbConnect from '../../utils/mongodb';
import Product from '../models/product';

export async function GET() {
  try {
    await dbConnect();
    
    const products = await Product.find({}).lean();
    
    // Transform the products to ensure IDs are properly formatted
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

    // Debug log to see what's being sent
    console.log('Formatted products sample:', formattedProducts[0]);

    return NextResponse.json({ 
      success: true, 
      data: formattedProducts 
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const newProduct = await Product.create(body);
    
    // Format the response to match GET response structure
    const formattedProduct = {
      id: newProduct._id.toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      imageUrl: newProduct.imageUrl,
      category: newProduct.category,
      stock: newProduct.stock,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt
    };

    return NextResponse.json({ 
      success: true, 
      data: formattedProduct 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 400 });
  }
}
