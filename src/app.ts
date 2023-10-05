import express from 'express';
import path from 'path';
import morgan from 'morgan';
import RootPath from 'app-root-path';
import * as fs from 'fs';
import Logger from './Infrastructure/Decorator/Logger';
import HomeController from './Controller/HomeController';

const app: express.Application = express();

// Initialize needed folders
const varDir = path.join(RootPath.toString(), 'var');
if (!fs.existsSync(varDir)) {
  fs.mkdirSync(varDir);
}

// Initialize logger
const logger: Logger = new Logger();
logger.setup();

app.set('view engine', 'pug');
app.set('views', path.join(RootPath.toString(), 'views'));
app.use(morgan('combined'));

const homeController = new HomeController();
app.get('/', homeController.get);

module.exports = app;
