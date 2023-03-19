import { DataTypes, Model, Sequelize } from "sequelize";
import { Task } from "./task";
import bcrypt from "bcrypt";

export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

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
