import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/mongodb';
import Product from '../../../models/product';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await dbConnect();

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
