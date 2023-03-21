import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import { injectable } from "inversify";
import { ITask } from "../types/interfaces/task/task";

export class Task extends Model implements ITask {
    public id!: number;
    public title!: string;
    public createdAt!: Date;
    public completed!: boolean;
    public tag!: string;

    static initModel(sequelize: Sequelize) {
        Task.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                },
                completed: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                tag: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "Home",
                },
            },
            {
                sequelize,
                timestamps: true,
                createdAt: true,
                updatedAt: false,
                modelName: "task",
            }
        );
    }

    static associate() {
        this.belongsTo(User, { foreignKey: "userId" });
    }
}
