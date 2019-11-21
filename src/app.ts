'use strict';

import express from "express"
import path from "path"
import morgan from "morgan"

import * as homeController from "./Controller/Home"

const app: express.Application = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(morgan("combined"));

app.get("/", homeController.home);

module.exports = app;
