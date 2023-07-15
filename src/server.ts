import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorlogger } from './shared/logger'
const port = 5000
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is connected sucessfully`)

    app.listen(port, () => {
      logger.info(`Example app listening on port ${port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to conntect', err)
  }
}

main()
