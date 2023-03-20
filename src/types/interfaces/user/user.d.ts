import { Model } from "sequelize";

export interface IUser extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface IRequestCreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface IResponseUserDTO {
    id: number;
    name: string;
    email: string;
}
