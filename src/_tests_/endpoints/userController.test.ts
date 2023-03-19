import app from "../../../app";
import request from "supertest";
import { initTestDB } from "../sequelize";
import { v4 as uuidv4 } from "uuid";

describe("ENDPOINT /user/", function () {
    let validToken: string;
    beforeAll(async () => {
        await initTestDB();
        const uuid = uuidv4();
        const createUserDTO = { name: "John Doe", email: `${uuid}@example.com`, password: uuid };
        await request(app).post("/user/create").send(createUserDTO);
        const loginRes = await request(app).post("/auth/login").send({ email: createUserDTO.email, password: uuid });
        validToken = loginRes.body.token;
    });

    it("POST create - it should create a new user", async () => {
        const createUserDTO = { name: "John Doe", email: "johndoe@example.com", password: "123456" };
        const createRes = await request(app).post("/user/create").send(createUserDTO);
        expect(createRes.statusCode).toBe(201);
    });

    it("GET getById - it should return status 200", async () => {
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
        const res = await request(app)
            .delete("/user/delete")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
    });
});
