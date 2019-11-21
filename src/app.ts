import express from 'express';
import path from 'path';
import morgan from 'morgan';

import HomeController from './Controller/HomeController';

const app: express.Application = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use(morgan('combined'));

const homeController = new HomeController();
app.get('/', homeController.get);

module.exports = app;
