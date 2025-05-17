import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './interfaces/user.interface';
import { ConflictException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 중복 아이디 체크
    const existing = await this.userModel.findOne({ user_id: createUserDto.user_id }).exec();
    if (existing) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }

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
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(user_id: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ user_id }).exec();
  }
}