import { Sequelize } from "sequelize";
import { createSequelize } from "../../factory/sequelize.config";

let sequelize: Sequelize | null = null;

export async function initTestDB(): Promise<Sequelize> {
    if (!sequelize) {
        sequelize = await createSequelize();
    }
    await clearDatabase(sequelize);
    return sequelize;
}

async function clearDatabase(sequelize: Sequelize) {
    const tables = Object.values(sequelize.models);
    for (const table of tables) {
        await table.destroy({ where: {} });
    }
}
