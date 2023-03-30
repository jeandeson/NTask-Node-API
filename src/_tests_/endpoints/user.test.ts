import app from "../../../app";
import request from "supertest";
import { closeTestDB, initTestDB } from "../sequelize";
import { Sequelize } from "sequelize";
import { getTestJwtToken } from "../utils/testUtils";

describe("ENDPOINT /user/", function () {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initTestDB();
    });

    afterEach(async () => {
        await closeTestDB();
    });

    it("POST create - it should create a new user", async () => {
        const createUserDTO = { name: "John Doe", email: "johndoe@example.com", password: "123456" };
        const createRes = await request(app).post("/user/create").send(createUserDTO);
        expect(createRes.statusCode).toBe(201);
    });

    it("GET getById - it should return status 200", async () => {
        let validToken = await getTestJwtToken(sequelize);
        const res = await request(app)
            .get("/user/getById")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
    });

    it("GET getById - it should return status 401", async () => {
        const res = await request(app)
            .get("/user/getById")
            .set("Authorization", `Bearer invalid-token`)
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(401);
    });

    it("DELETE it should return status 200", async () => {
        let validToken = await getTestJwtToken(sequelize);
        const res = await request(app)
            .delete("/user/delete")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
    });
});
