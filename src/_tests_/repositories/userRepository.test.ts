import "../../config/environment";
import "reflect-metadata";
import { User } from "../../models/user";
import UserRepository from "../../repository/userRepository";
import { createSequelize } from "../../factory/sequelize.config";

describe("userRepository", () => {
    let userRepository: UserRepository;

    beforeAll(async () => {
        await createSequelize();
        userRepository = new UserRepository(User);
    });
    describe("getById", () => {
        it("should return user not found", async () => {
            const user = await userRepository.getById(123);
            expect(user).toBe(null);
        });
    });
});
