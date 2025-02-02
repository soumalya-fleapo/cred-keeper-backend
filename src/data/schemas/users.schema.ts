import { UserRoles } from '@data/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], default: [UserRoles.USER] })
  roles: UserRoles[];

  @Prop({ nullable: true })
  deleted_at: Date | null;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
