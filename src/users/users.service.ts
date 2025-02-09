import { SignupInput } from '@app/auth/dto';
import { UserProfilesModel, UsersModel } from '@data/models';
import { User, UserProfile } from '@data/schemas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersModel: UsersModel,
    private readonly userProfilesModel: UserProfilesModel,
  ) {}

  public createUser(body: SignupInput): Promise<User> {
    return this.usersModel.createUser(body);
  }
  public createUserProfile({
    user,
    body,
  }: {
    user: User;
    body: SignupInput;
  }): Promise<UserProfile> {
    return this.userProfilesModel.createUserProfile({ user, body });
  }

  public getUsers(): Promise<User[]> {
    return this.usersModel.getUsers();
  }
}
