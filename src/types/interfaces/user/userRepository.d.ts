import { IUser, ICreateUserDTO } from "./user";

export interface IUserRepository {
    getById(id: number): Promise<IUser | null>;
    getByEmail(email: string): Promise<IUser | null>;
    post(user: ICreateUserDTO): Promise<IUser>;
    delete(id: number): Promise<number>;
    updatePassword(id: number, password: string): Promise<[affectedCount: number]>;
    updatePasswordResetTokenHash(
        id: number,
        passwordResetTokenHash: string,
        passwordResetExpiresAt: Date
    ): Promise<[affectedCount: number]>;
}
