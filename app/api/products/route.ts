import { NextResponse } from 'next/server';
import clientPromise from '../../utils/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    
    const products = await db.collection('products').find({}).toArray();
    
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
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const body = await req.json();
    const result = await db.collection('products').insertOne(body);
    
    const newProduct = {
      id: result.insertedId.toString(),
      ...body
    };

    return NextResponse.json({ 
      success: true, 
      data: newProduct 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 400 });
  }
}
