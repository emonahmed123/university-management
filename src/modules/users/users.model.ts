import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'
type UserModel = Model<IUser, object>
const userSchema = new Schema<IUser>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

export const User = model<IUser, UserModel>('User', userSchema)
