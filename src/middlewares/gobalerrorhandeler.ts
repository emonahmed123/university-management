import { ErrorRequestHandler } from 'express'
import config from '../config'

import { IGenericErrorMessage } from '../Interfaces/error'
import handleValidationError from '../error/handleValidationError'
// import { error } from 'winston'
import ApiError from '../error/ApiError'
import { Error } from 'mongoose'
const globalErrorHander: ErrorRequestHandler = (error, req, res, next) => {
  // res.status(400).json({
  //   err: err,
  // })

  // eslint-disable-next-line prefer-const
  let statusCode = 500
  // eslint-disable-next-line prefer-const
  let message = 'Something went wrong'
  // eslint-disable-next-line prefer-const
  let errorMessage: IGenericErrorMessage[] = []

  if (error.name == 'ValidationError') {
    const simplifeidError = handleValidationError(error)
    statusCode = simplifeidError.statusCode
    message = simplifeidError.message
    errorMessage = simplifeidError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error.message
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error.stack : undefined,
  })
  next()
}

export default globalErrorHander