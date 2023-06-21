const { createLogger, format, transports } = require("winston");
const path = require("path");
const winston = require("winston");

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};


module.exports = createLogger({
  levels: logLevels,
 // format: format.combine(format.timestamp(), format.json()),
  exitOnError: false,
  transports: [
    new winston.transports.File({
      name: "error-file",
      filename: "./logs/log",
    }),
  ],
});
