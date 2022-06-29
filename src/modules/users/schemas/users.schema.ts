import * as mongoose from 'mongoose';
import { Role } from '../roles/enum/role.enum';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    roles: { type: String, default: Role.USER },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);
