import { inject, injectable } from "inversify";
import { TYPES } from "../data/symbols";
import { User } from "../models/user";
import { IUserRepository } from "../types/interfaces/user/userRepository";
import { IRequestCreateUserDTO } from "../types/interfaces/user/user";

@injectable()
export default class UserRepository implements IUserRepository {
    constructor(@inject(TYPES.User) private user: typeof User) {}

    async getById(id: number) {
        try {
            return await this.user.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email: string) {
        try {
            return await this.user.findOne({ where: { email } });
        } catch (error) {
            throw error;
        }
    }

    async post(user: IRequestCreateUserDTO) {
        try {
            return await this.user.create({ ...user });
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            return await this.user.destroy({ where: { id } });
        } catch (error) {
            throw error;
        }
    }
}
