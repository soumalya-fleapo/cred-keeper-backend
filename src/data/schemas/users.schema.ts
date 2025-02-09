import { UserRoles } from '@data/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class Users {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [String], enum: UserRoles, default: [UserRoles.USER] })
  roles: UserRoles[];

  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
