import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema(
  {
    amount: { type: Number },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
    collection: 'itens',
  },
);
