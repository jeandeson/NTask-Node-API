import { ModelStatic } from "sequelize";
import { User } from "../../models/user";
import { IRequestCreateUserDTO, IResponseUserDTO } from "../../types/interfaces/user/user";

export class RequestCreateUserDTO implements IRequestCreateUserDTO {
    public name: string;
    public email: string;
    public password: string;
    constructor(payload: { name: string; email: string; password: string }) {
        this.name = payload.name;
        this.email = payload.email;
        this.password = payload.password;
    }
}

export class ResponseUserDTO implements IResponseUserDTO {
    public id: number;
    public name: string;
    public email: string;

    constructor(payload: { name: string; email: string; id: number }) {
        this.id = payload.id;
        this.name = payload.name;
        this.email = payload.email;
    }
}
