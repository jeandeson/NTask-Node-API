import { SequelizeFactoryImpl } from "./sequelize.factory";

export async function createSequelize() {
    const sequelizeFactoryImpl = new SequelizeFactoryImpl();
    return await sequelizeFactoryImpl.createSequelizeInstance();
}
