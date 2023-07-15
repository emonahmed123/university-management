/* eslint-disable no-undef */

import { createLogger, format, transports } from 'winston'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf, prettyPrint } = format
// custom code formate

const myFormat = printf(({ level, message, label, timestamp }) => {
  const bigTime = new Date(timestamp)

  const hours = bigTime.getHours()
  const minutes = bigTime.getMinutes()
  const second = bigTime.getSeconds()

  return `${bigTime.toDateString()} ${hours}:${minutes} :${second} }[${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'ES ' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),

  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'sucesses',
        'esu-%DATE%-sucess.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'ES' }), myFormat, timestamp(), prettyPrint()),

  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'esu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorlogger }
