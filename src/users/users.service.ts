import { SignupInput } from '@app/auth/dto';
import { UserProfilesModel, UsersModel } from '@data/models';
import { User, UserProfile } from '@data/schemas';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersModel: UsersModel,
    private readonly userProfilesModel: UserProfilesModel,
  ) {}

  public async createUser(input: SignupInput): Promise<User> {
    return this.usersModel.create(input);
  }

  public createUserProfile(input: {
    user: Types.ObjectId;
    name: string;
  }): Promise<UserProfile> {
    return this.userProfilesModel.create(input);
  }

  public getUsers(): Promise<User[]> {
    return this.usersModel.find();
  }
}
