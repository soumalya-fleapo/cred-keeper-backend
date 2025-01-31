import { Users } from '@data/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersModel {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  public getUsers(): Promise<Users[]> {
    return this.usersModel.find();
  }
}
