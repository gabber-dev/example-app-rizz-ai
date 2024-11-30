const pino = require("pino");

const logger = (defaultConfig) => {
  if (process.env.NODE_ENV === "development") {
    return pino({
      ...defaultConfig,
      redact: {
        paths: ["_extra"],
        censor: "**REDACTED**"
      },
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  }
  return pino({
    ...defaultConfig,
    messageKey: "message",
    redact: {
      paths: ["_extra"],
      censor: "**REDACTED**"
    },
    formatters: {
      level: (label) => {
        return { level: label };
      },
    }
  });
};

module.exports = {
  logger,
};
