import "./src/config/environment";
import config from "./src/config/express";
import "reflect-metadata";
import "./src/controllers/taskController";
import "./src/controllers/userController";
import "./src/controllers/authController";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./src/inversify/container";
import { decorate, injectable } from "inversify";
import { Model } from "sequelize";
import { createSequelize } from "./src/factory/sequelize.config";
import errorHandler from "./src/middlewares/errorHandler";
import { TYPES } from "./src/data/symbols";
import { IPassportAuthenticator } from "./src/types/interfaces/auth/passportAuthenticator";
import express from "express";

decorate(injectable(), Model);

const server = new InversifyExpressServer(container);

const passport: IPassportAuthenticator = container.get(TYPES.PassportAuthenticator);

(async () => await createSequelize())();

server.setConfig((app) => {
    config(app);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(errorHandler);
});

const app = server.build();

export default app;
