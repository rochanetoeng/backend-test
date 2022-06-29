import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);
