import { inject, injectable } from "inversify";
import { ICreateUserDTO, IUser } from "../types/interfaces/user/user";
import { IUserService } from "../types/interfaces/user/userService";
import { TYPES } from "../data/symbols";
import { IUserRepository } from "../types/interfaces/user/userRepository";
import { BadRequestError } from "../errors/badRequest";
import { NotFoundError } from "../errors/notFound";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}

    async getById(id: number): Promise<IUser | null> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError(`user with id ${id} not found.`);
        }
        return user;
    }

    async post(user: ICreateUserDTO): Promise<IUser> {
        const existingUser = await this.userRepository.getByEmail(user.email);
        if (existingUser) {
            throw new BadRequestError(`email already exists: ${existingUser.email}`);
        }
        const createdUser = await this.userRepository.post(user);
        return createdUser;
    }

    async delete(id: number): Promise<number> {
        const affectedRows = await this.userRepository.delete(id);
        if (affectedRows <= 0) {
            throw new NotFoundError("user not found");
        }
        return affectedRows;
    }
}
