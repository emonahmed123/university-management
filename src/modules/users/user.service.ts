import { User } from './users.model';
import { IUser } from './users.interface';
import config from '../../config/index';
import { generateUserId } from './user.utlites';
import ApiError from '../../error/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id

  const id = await generateUserId();
  // console.log(id);
  user.id = id;

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const userService = {
  createUser,
};
