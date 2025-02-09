import { UserProfile } from '@data/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserProfilesModel {
  constructor(
    @InjectModel(UserProfile.name) private model: Model<UserProfile>,
  ) {}
}
