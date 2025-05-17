import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.user_password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      user_password: hashedPassword,
    });

    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }

  async findByUserId(user_id: string): Promise<User> {
    return await this.userModel.findOne({ user_id }).exec();
  }
}