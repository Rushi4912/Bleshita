import { NextResponse } from 'next/server';
import dbConnect from '../../utils/mongodb';
import Product from '../models/product';

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
