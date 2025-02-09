import { Themes } from '@data/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './users.schema';

@Schema({
  collection: 'userProfiles',
  versionKey: false,
  timestamps: true,
})
export class UserProfile {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, nullable: true })
  avatarUrl: string | null;

  @Prop({ type: String, default: Themes.LIGHT })
  theme: Themes;

  @Prop({ type: Date, nullable: true, default: null })
  deletedAt: Date | null;
}

export const UserProfilesSchema = SchemaFactory.createForClass(UserProfile);
