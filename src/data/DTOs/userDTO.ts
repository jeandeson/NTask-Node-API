import { ModelStatic } from "sequelize";
import { User } from "../../models/user";
import { ICreateUserDTO } from "../../types/interfaces/user/user";

export class CreateUserDTO implements ICreateUserDTO {
    public name: string;
    public email: string;
    public password: string;
    constructor(payload: { name: string; email: string; password: string }) {
        this.name = payload.name;
        this.email = payload.email;
        this.password = payload.password;
    }
}
