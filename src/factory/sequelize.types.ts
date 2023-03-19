import { Sequelize } from "sequelize";

interface SequelizeFactory {
    createSequelizeInstance(): Promise<Sequelize>;
}

export { SequelizeFactory };
