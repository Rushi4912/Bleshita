import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../utils/mongodb';
import Product from '../models/product';

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  if (id) {
    // Fetch product by ID
    try {
      const product = await Product.findById(id).select('-__v');
      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID or server error' },
        { status: 400 }
      );
    }
  }

  if (category) {
    // Fetch products by category
    try {
      const products = await Product.find({ category }).select('-__v');
      if (!products.length) {
        return NextResponse.json({ success: false, error: 'No products found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: products });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: 'Server error fetching products by category' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { success: false, error: 'Missing id or category parameter' },
    { status: 400 }
  );
}
