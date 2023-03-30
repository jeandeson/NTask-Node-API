import { DataTypes, Model, Sequelize } from "sequelize";
import { Task } from "./task";
import bcrypt from "bcrypt";
import { IUser } from "../types/interfaces/user/user";

export class User extends Model implements IUser {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public passwordResetTokenHash?: string;
    public passwordResetExpiresAt?: Date;
    static initModel(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                passwordResetTokenHash: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: null,
                },
                passwordResetExpiresAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                sequelize,
                timestamps: false,
                modelName: "user",
            }
        );

        User.beforeCreate((user) => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;
        });
    }
    static associate() {
        User.hasMany(Task);
    }
}
