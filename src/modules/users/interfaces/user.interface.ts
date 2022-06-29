import { Document } from 'mongoose';
import { Role } from '../roles/enum/role.enum';

export class User extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
}
