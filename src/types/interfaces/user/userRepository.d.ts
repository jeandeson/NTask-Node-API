import { IUser, ICreateUserDTO } from "./user";

export interface IUserRepository {
    getById(id: number): Promise<IUser | null>;
    getByEmail(email: string): Promise<IUser | null>;
    post(user: ICreateUserDTO): Promise<IUser>;
    delete(id: number): Promise<number>;
}
