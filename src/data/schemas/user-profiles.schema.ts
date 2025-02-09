import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Users } from './users.schema';
import mongoose from 'mongoose';
import { Themes } from '@data/enums';

@Schema({
  collection: 'userProfiles',
  timestamps: true,
})
export class UserProfiles {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  userId: Users;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, nullable: true })
  avatarUrl: string | null;

  @Prop({ type: String, default: Themes.LIGHT })
  theme: Themes;

  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;
}

export const UserProfilesSchema = SchemaFactory.createForClass(UserProfiles);
