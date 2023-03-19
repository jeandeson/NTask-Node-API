import { inject, injectable } from "inversify";
import { TYPES } from "../data/symbols";
import { User } from "../models/user";
import { IUserRepository } from "../types/interfaces/user/userRepository";
import { ICreateUserDTO } from "../types/interfaces/user/user";

@injectable()
export default class UserRepository implements IUserRepository {
    constructor(@inject(TYPES.User) private user: typeof User) {}

    async getById(id: number) {
        return await this.user.findByPk(id);
    }

    async getByEmail(email: string) {
        return await this.user.findOne({ where: { email } });
    }

    async post(user: ICreateUserDTO) {
        return await this.user.create({ ...user });
    }

    async delete(id: number) {
        return await this.user.destroy({ where: { id } });
    }
}
