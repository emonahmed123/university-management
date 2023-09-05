import { RequestHandler } from 'express'
import { userService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)

    res.status(200).json({
      sucess: true,
      data: result,
      massage: 'Create user sucessfully',
    })
  } catch (err) {
    // res.status(400).json({
    //   sucess: false,
    //   massage: 'Faile to create User',
    // })

    next(err)
  }
}

export const UserController = {
  createUser,
}
