import { User } from '@data/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersModel {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  public getUsers(): Promise<User[]> {
    return this.model.find();
  }
}
