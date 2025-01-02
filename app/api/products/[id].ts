import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/mongodb'; // Adjust the path based on your folder structure
import Product, { IProduct } from '../models/product'; // Ensure your product model has TypeScript typings

// Define a type for the response data structure
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IProduct | null>>
): Promise<void> {
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid ID' });
  }

  switch (method) {
    case 'GET': // Get a product by ID
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    case 'PUT': // Update a product by ID
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    case 'DELETE': // Delete a product by ID
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: deletedProduct });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
}
