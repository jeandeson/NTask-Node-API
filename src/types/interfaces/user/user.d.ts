import { Model } from "sequelize";

export interface IUser extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}
