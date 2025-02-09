import { UserRoles } from '@data/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
})
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [String], enum: UserRoles, default: [UserRoles.USER] })
  roles: UserRoles[];

  @Prop({ type: Date, nullable: true, default: null })
  deletedAt: Date | null;
}

export const UsersSchema = SchemaFactory.createForClass(User);
