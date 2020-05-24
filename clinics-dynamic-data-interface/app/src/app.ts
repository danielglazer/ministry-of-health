import * as chokidar from 'chokidar';

import logger from './logs/logger';
import { config } from '../config/config';
import { newFileListener } from './helpers/utill';


logger.debug("clinics-dynamic-data-interface starting...");
const watcher = chokidar.watch(config.dirPath, { persistent: true });
watcher.on('add', newFileListener);
