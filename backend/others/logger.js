import winston from "winston";
import path from "path";
import fs from "fs";

// create logs folder if not exists
const logDir = path.join(process.cwd(), "./app/logging");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// define log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// create logger
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    // console logs
    new winston.transports.Console(),

    // error logs
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error"
    }),

    // all logs
    new winston.transports.File({
      filename: path.join(logDir, "combined.log")
    })
  ]
});

export default logger;