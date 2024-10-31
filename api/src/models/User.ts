import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  preferences: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }]
}, { timestamps: true });

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  const { preferences, ...rest } = userObject;
  return { ...rest, preferences };
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
