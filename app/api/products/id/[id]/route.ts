import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/mongodb'; // Ensure this path is correct
import Product from '../../../models/product'; // Ensure this path is correct

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Connect to the database
    await dbConnect();

    // Validate the ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID format' },
        { status: 400 }
      );
    }

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Return the product data
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
