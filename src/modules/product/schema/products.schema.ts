import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  price: { type: String },
  description: { type: String },
  banner: { type: String },

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});
