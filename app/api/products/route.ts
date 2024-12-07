import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../utils/mongodb';
import Product from '../models/product';
import { MongooseError } from 'mongoose';

// API to handle product creation (POST request)
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    const { name, description, price, category, stock } = await request.json();

    
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      stock,  
      
    });
    await newProduct.save();

    // Return a success response
    return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof MongooseError) {
      // Handle Mongoose-specific errors
      console.error('Error creating product:', error.message);
    } else {
      // Generic error handling
      console.error('Unknown error:', error);
    }

    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
