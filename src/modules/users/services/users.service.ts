import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });

    const userAlreadyExists = await this.userModel.findOne({ email });
    if (userAlreadyExists) throw new BadRequestException('O usuário já existe');

    await newUser.save();
    newUser.password = undefined;
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(_id: string): Promise<User> {
    const userAlreadyExists = await this.userModel.findById({ _id });
    if (!userAlreadyExists) throw new BadRequestException('Id não encontrado');
    return userAlreadyExists;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
