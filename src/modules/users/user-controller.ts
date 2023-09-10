import { RequestHandler } from 'express';
import { userService } from './user.service';
import { z } from 'zod';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // req-validation
    // body ==> object;
    //data==> boject;
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required ',
        }),
        password: z.string().optional(),
      }),
    });

    await createUserZodSchema.parseAsync(req);

    const { user } = req.body;
    const result = await userService.createUser(user);

    res.status(200).json({
      sucess: true,
      data: result,
      massage: 'Create user sucessfully',
    });
  } catch (err) {
    // res.status(400).json({
    //   sucess: false,
    //   massage: 'Faile to create User',
    // })

    next(err);
  }
};

export const UserController = {
  createUser,
};
