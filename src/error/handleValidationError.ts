import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../Interfaces/error'
import { IGenericErrorResponse } from '../Interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el ? el.path : '',
        message: el ? el.message : '',
      }
    }
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
