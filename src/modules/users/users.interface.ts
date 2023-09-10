import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
};

type UserModel = Model<IUser, Record<string, unknown>>;

export default UserModel;
