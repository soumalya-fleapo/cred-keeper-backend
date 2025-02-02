import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Users } from './users.schema';
import mongoose from 'mongoose';
import { UserThemes } from '@data/enums';

@Schema({
  timestamps: true,
})
export class UserProfiles {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  user_id: Users;

  @Prop({ required: true })
  name: string;

  @Prop({ nullable: true })
  avatar_url: string | null;

  @Prop({ type: String, default: UserThemes.LIGHT })
  theme: UserThemes;

  @Prop({ nullable: true })
  deleted_at: Date | null;
}

export const UserProfilesSchema = SchemaFactory.createForClass(UserProfiles);
