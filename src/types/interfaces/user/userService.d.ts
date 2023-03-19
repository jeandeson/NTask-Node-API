import { IUser, ICreateUserDTO } from "./user";

export interface IUserService {
    getById(id: number): Promise<IUser | null>;
    post(user: ICreateUserDTO): Promise<IUser>;
    delete(id: number): Promise<number>;
}
