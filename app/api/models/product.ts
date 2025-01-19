import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageGallery?: string[];
  colors?: string[];
  sizes?: string[];
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    imageGallery: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { 
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Clear the model if it exists to prevent the "Cannot overwrite model once compiled" error
mongoose.models = {};

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
