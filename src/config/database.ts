import { Dialect, Options } from "sequelize";

const config: Options = {
    database: process.env.database,
    username: process.env.username,
    password: process.env.password,
    dialect: process.env.dialect as Dialect,
    storage: process.env.storage,
    logging: false,
    sync: { force: process.env.sync ? true : false },
};

export default config;
