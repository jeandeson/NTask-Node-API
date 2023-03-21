import "reflect-metadata";
import "./src/config/environment";
import config from "./src/config/express";
import { InversifyExpressServer } from "inversify-express-utils";
import { iocContainer } from "./src/inversify/ioc";
import { createSequelize } from "./src/factory/sequelize.config";
import errorHandler from "./src/middlewares/errorHandler";
import { TYPES } from "./src/data/symbols";
import { IAuthService } from "./src/types/interfaces/auth/passportAuthenticator";
import express from "express";

const server = new InversifyExpressServer(iocContainer);

const passport: IAuthService = iocContainer.get(TYPES.AuthService);

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
