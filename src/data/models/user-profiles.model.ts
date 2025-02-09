import { SignupInput } from '@app/auth/dto';
import { User, UserProfile } from '@data/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserProfilesModel {
  constructor(
    @InjectModel(UserProfile.name) private model: Model<UserProfile>,
  ) {}

  public async createUserProfile({
    user,
    body,
  }: {
    user: User;
    body: SignupInput;
  }): Promise<UserProfile> {
    const existingProfile = await this.model.findById(user._id);

    if (existingProfile) {
      throw new HttpException(
        { message: 'Profile already exists.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.model.create({
      user: user._id,
      name: body.name,
    });
  }
}
