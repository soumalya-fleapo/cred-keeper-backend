import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SignupInput } from '@app/auth/dto';
import { User } from '@data/schemas';

@Injectable()
export class UsersModel {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  public async create(input: SignupInput): Promise<User> {
    return this.model.create({ _id: new Types.ObjectId(), ...input });
  }

  public find(): Promise<User[]> {
    return this.model.find();
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }
}
