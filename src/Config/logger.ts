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
  meta: true,
  colorize: true,
  transports: [
    new winston.transports.Console()
  ],
  requestWhitelist: ['query'],
  dynamicMeta:  (req, _res) => {
    type metadata = {
      requestMethod: string | undefined,
      requestUrl: string | undefined
    }

    const meta: metadata = {
      requestMethod: req.method,
      requestUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    }

    return meta;
  }
}