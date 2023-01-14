import * as dotenv from 'dotenv';
import config from "./Config";
import App from "./App";

dotenv.config();


new App({
  mode: config.mode || 'dev',
  http: {
    port: config.http.port
  },
  proxy: {
    enabled: config.proxy.enabled,
    host: config.proxy.host,
    port: config.proxy.port
  },
  logger: config.logger
});