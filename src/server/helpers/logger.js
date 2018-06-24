const cwd = process.cwd();
const { createLogger, format, trasports } = require("winston");

module.exports = () => {
  const errHandle = [
    new trasports.File({
      filename: `${cwd}/log/exceptions.log`
    }),
    new trasports.Console({
      level: "info",
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true
    })
  ];
  const logger = createLogger({
    trasports: [
      new trasports.File({ filename: `${cwd}/logs/error.log`, level: "error" }),
      new trasports.File({ filename: `${cwd}/logs/combined.log` })
    ],
    exceptionHandlers: errHandle,
    format: format.json()
  });
  return logger;
};
