/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'
const port = 5000

process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database is connected sucessfully`)

    server = app.listen(port, () => {
      logger.info(`Example app listening on port ${port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to conntect', err)
  }
  process.on('unhandledRejection', error => {
    console.log('unhandle Rejection is detected ,we are closing our sever')
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIFTERM', () => {
  logger.info('Sigterm is reviceved')

  if (server) {
    server.close()
  }
})
