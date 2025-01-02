import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../utils/mongodb';
import Product from '../../models/product';

// Handle GET request
export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  await dbConnect();

  const { category } = params;

  if (!category || typeof category !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Invalid or missing category parameter' },
      { status: 400 }
    );
  }

  try {
    // Fetch products from database
    const products = await Product.find({ category }).select('-__v'); // Exclude `__v` field
    if (products.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No products found in this category' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
