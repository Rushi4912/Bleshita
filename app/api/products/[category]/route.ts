import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/mongodb';
import Product from '../../models/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const {
    method,
    query: { category },
  } = req;

  switch (method) {
    case 'GET': // Fetch products by category
      try {
        if (!category || typeof category !== 'string') {
          return res.status(400).json({ success: false, error: 'Invalid category' });
        }

        const products = await Product.find({ category });
        if (products.length === 0) {
          return res.status(404).json({ success: false, error: 'No products found in this category' });
        }

        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
}
