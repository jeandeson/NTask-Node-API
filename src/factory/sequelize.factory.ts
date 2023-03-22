import { Sequelize } from "sequelize";
import config from "../config/database";
import { Options } from "sequelize";
import { SequelizeFactory } from "./sequelize.types";
import fs from "fs";
import path from "path";
import { injectable } from "inversify";

@injectable()
export class SequelizeFactoryImpl implements SequelizeFactory {
    public async createSequelizeInstance(): Promise<Sequelize> {
        const sequelize = new Sequelize(config as Options);
        await this.registerModels(sequelize);
        return sequelize;
    }

    private async registerModels(sequelize: Sequelize) {
        const models: any = {};
        const modelsDir = path.join(__dirname, "../models");
        fs.readdirSync(modelsDir).forEach((file) => {
            if (file.endsWith(".js") || file.endsWith(".ts")) {
                const model = require(path.join(modelsDir, file));
                const modelName = Object.keys(model)[0];
                const ModelClass: any = Object.values(model)[0];
                ModelClass.initModel(sequelize);
                models[modelName] = ModelClass;
            }
        });

        Object.keys(models).forEach((modelName) => {
            models[modelName].associate?.(sequelize.models);
        });

        await sequelize.sync();
    }
}
