import app from "../../../app";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { closeTestDB, initTestDB } from "../sequelize";
import { getTestResetToken } from "../utils/testUtils";
import { Sequelize } from "sequelize";

describe("ENDPOINT /auth/", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initTestDB();
    });

    afterEach(async () => {
        await closeTestDB();
    });

    it("POST login - it should login a user", async () => {
        const uuid = uuidv4();
        const createUserDTO = { name: "John Doe", email: `${uuid}@example.com`, password: uuid };
        await request(app).post("/user/create").send(createUserDTO);
        const loginRes = await request(app).post("/auth/login").send({ email: createUserDTO.email, password: uuid });
        expect(loginRes.statusCode).toBe(200);
        expect(loginRes.body).toHaveProperty("token");
    });
    it("POST forgotPassword - it should send a reset token", async () => {
        const uuid = uuidv4();
        const createUserDTO = { name: "John Doe", email: `${uuid}@gmail.com`, password: uuid };
        await request(app).post("/user/create").send(createUserDTO);
        const forgotRes = await request(app).post("/auth/forgotPassword").send({ email: createUserDTO.email });
        expect(forgotRes.statusCode).toBe(200);
        expect(forgotRes.body).toHaveProperty("message");
    });
    it("POST resetPassword/:token - it should reset a user password", async () => {
        let validResetToken = await getTestResetToken(sequelize);
        const resetRes = await request(app)
            .post(`/auth/resetPassword/${validResetToken}`)
            .send({ password: "newstrongpassword" });
        expect(resetRes.statusCode).toBe(200);
    });
});
