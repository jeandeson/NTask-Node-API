import { inject, injectable } from "inversify";
import { TYPES } from "../data/symbols";
import { User } from "../models/user";
import { IUserRepository } from "../types/interfaces/user/userRepository";
import { IRequestCreateUserDTO } from "../types/interfaces/user/user";

export default class UserRepository implements IUserRepository {
    constructor(@inject(TYPES.User) private user: typeof User) {}

    async getById(id: number) {
        return await this.user.findByPk(id);
    }

    async getByEmail(email: string) {
        return await this.user.findOne({ where: { email } });
    }

    async post(user: IRequestCreateUserDTO) {
        return await this.user.create({ ...user });
    }

    async updatePassword(id: number, password: string) {
        const updateResult = await this.user.update({ password }, { where: { id } });
        await this.updatePasswordResetTokenHash(id, null, null);
        return updateResult;
    }

    async updatePasswordResetTokenHash(id: number, passwordResetTokenHash: string | null, passwordResetExpiresAt: Date | null) {
        return await this.user.update({ passwordResetExpiresAt, passwordResetTokenHash }, { where: { id } });
    }

    async delete(id: number) {
        return await this.user.destroy({ where: { id } });
    }
}
