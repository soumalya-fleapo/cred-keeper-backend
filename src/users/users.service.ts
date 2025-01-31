import { UsersModel } from '@data/models';
import { Users } from '@data/schemas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersModel: UsersModel) {}

  public getUsers(): Promise<Users[]> {
    return this.usersModel.getUsers();
  }
}
