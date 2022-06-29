import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    table: { type: Number, unique: true },
    status: { type: Boolean, default: false },
    draft: { type: Boolean, default: true },
    name: { type: String, default: null },
    itens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'ordens',
  },
);
