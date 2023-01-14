import {app} from './app';
import {constants} from './constants';
import {proxy} from './proxy';
import {logger} from "./logger";

export default {
  ...app,
  constants,
  proxy,
  logger
}