import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: false },
  price: { type: Number, required: false },
  category: { type: String, required: false },
  description: { type: String, required: false },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
