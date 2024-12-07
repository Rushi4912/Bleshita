// app/api/products/[category]/route.ts
import Product from '../../models/product'; // Import Product model
import dbConnect from '../../../utils/mongodb'; // Import dbConnect utility to connect to MongoDB

export async function GET(req: Request, { params }: { params: { category: string } }) {
  try {
    // Connect to MongoDB database
    await dbConnect();

    // Destructure category from params (this will come from the dynamic route)
    const { category } = params;

    // Query the products based on the category
    const products = await Product.find({ category });

    // Return the products as a JSON response
    return new Response(JSON.stringify(products), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle errors (like connection failure or query issues)
    console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}
