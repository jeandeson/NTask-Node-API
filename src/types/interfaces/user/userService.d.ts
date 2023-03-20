import { IUser, IRequestCreateUserDTO, IResponseUserDTO } from "./user";

export interface IUserService {
    getById(id: number): Promise<IResponseUserDTO | null>;
    post(user: IRequestCreateUserDTO): Promise<IResponseUserDTO>;
    delete(id: number): Promise<number>;
}
