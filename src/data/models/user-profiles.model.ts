import { UserProfile } from '@data/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserProfilesModel {
  constructor(
    @InjectModel(UserProfile.name) private model: Model<UserProfile>,
  ) {}

  public create(input: {
    user: Types.ObjectId;
    name: string;
  }): Promise<UserProfile> {
    return this.model.create(input);
  }
}
