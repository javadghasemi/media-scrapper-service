import proxy from "node-global-proxy";
import {createServer, Server} from "http";

import express, {Application} from 'express';
import bodyParser from 'body-parser';
import expressWinston from 'express-winston';
import router from "./router";
import requestId from "./Middleware/request-id.middleware";
import {ExceptionHandler} from "./Exception/handler.exception";


type ApplicationConfig = {
  mode: string,
  http: {
    port: string
  },
  proxy?: {
    enabled: boolean,
    host: string,
    port: number
  },
  logger: expressWinston.LoggerOptions
}

export default class App {
  private app: Application = express();

  constructor(private config: ApplicationConfig) {
    this.initialProxy();
    this.initServer();
    this.initMiddlewares();
  }

  private initServer(): void {
    const server: Server = createServer(this.app);
    const port: string = this.config.http.port;

    server.listen(port, () => console.log(`Server started at port ${port}`));
  }

  private initMiddlewares(): void {
    /*
     * Initialize Router...
     */
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    this.app.use(requestId);
    this.app.use(expressWinston.logger(this.config.logger));
    this.app.use(router);
    this.app.use(ExceptionHandler.handle);
  }

  /**
   * @description Set global proxy for bypass FUCKING filtering with Lantern!!!
   */
  private initialProxy(): void {
    if (this.config.mode === 'dev' && (this.config.proxy && this.config.proxy.enabled)) {
      proxy.setConfig(`${this.config.proxy.host}:${this.config.proxy.port}`);
      proxy.start();
    }
  }
}