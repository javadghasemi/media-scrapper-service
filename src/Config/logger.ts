import winston, {format} from "winston";
import expressWinston from "express-winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp}
└─> ${message}`;
});

export const logger: expressWinston.LoggerOptions = {
  level: 'info',
  format: combine(
    format.colorize(),
    timestamp(),
    myFormat
  ),
  colorize: true,
  transports: [
    new winston.transports.Console()
  ]
}