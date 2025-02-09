import { UsersModel } from '@data/models';
import { User } from '@data/schemas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersModel: UsersModel) {}

  public getUsers(): Promise<User[]> {
    return this.usersModel.getUsers();
  }
}
