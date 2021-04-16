import Mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { generateHash } from '../../src/utils';

export type IUser = {
  id: string;
  email: string;
  password: string;
  salt: string;
};

const UserSchema = new Schema({
  email: String,
  password: String,
  salt: String
});

export const User = Mongoose.model<Document & IUser>('User', UserSchema, 'users');

async function getUser(email: string) {
  return await User.findOne({ email }).exec();
}

async function addUser(user: Omit<IUser, 'salt'>) {
  const salt = crypto.randomBytes(20).toString();
  const hash = generateHash(user.password);
  const password = hash + salt;
  const newUser = new User({ email: user.email, password, salt });
  newUser.isNew = true;
  await newUser.save();
}

type UserRepository = {
  getUser(email: string): Promise<IUser | null>;
  addUser(user: Omit<IUser, 'salt'>): Promise<void>;
};

export const userRepository: UserRepository = {
  async getUser(email: string) {
    return await getUser(email);
  },

  async addUser(user: Omit<IUser, 'salt'>) {
    await addUser(user);
  }
};
