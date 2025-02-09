import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupInput } from '@app/auth/dto/auth.dto';
import { User } from '@data/schemas';

const saltRounds = 12;

@Injectable()
export class UsersModel {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  public async createUser(body: SignupInput): Promise<User> {
    const user = await this.model.create({
      _id: new Types.ObjectId(),
      email: body.email,
      password: await bcrypt.hash(body.password, saltRounds),
    });

    return user;
  }

  public getUsers(): Promise<User[]> {
    return this.model.find();
  }

  public findUserByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email, deleted_at: null });
  }
}
