import app from "../../../app";
import request from "supertest";
import { initTestDB } from "../sequelize";
import { v4 as uuidv4 } from "uuid";

describe("ENDPOINT /task/", function () {
    let validToken: string;
    beforeAll(async () => {
        await initTestDB();
        const uuid = uuidv4();
        const createUserDTO = { name: "John Doe", email: `${uuid}@example.com`, password: uuid };
        await request(app).post("/user/create").send(createUserDTO);
        const loginRes = await request(app).post("/auth/login").send({ email: createUserDTO.email, password: uuid });
        validToken = loginRes.body.token;
    });

    it("POST create - it should create a new task", async () => {
        const createTaskDTO = { title: "Wash Car", tag: "Home" };
        const createTaskRes = await request(app)
            .post("/task/create")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json")
            .send(createTaskDTO);
        expect(createTaskRes.statusCode).toBe(201);
    });
    it("GET getById - it should return a task and status 200", async () => {
        const createTaskDTO = { title: "Wash Car", tag: "Home" };
        const createTaskRes = await request(app)
            .post("/task/create")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json")
            .send(createTaskDTO);
        const getRes = await request(app)
            .get(`/task/getById/${createTaskRes.body.id}`)
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json");
        expect(getRes.statusCode).toBe(200);
    });
    it("put update - it should update a task and return status 200", async () => {
        const createTaskDTO = { title: "Wash Car", tag: "Home" };
        const createTaskRes = await request(app)
            .post("/task/create")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json")
            .send(createTaskDTO);
        const getRes = await request(app)
            .get(`/task/getById/${createTaskRes.body.id}`)
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json");
        const putRes = await request(app)
            .put(`/task/update/${getRes.body.id}`)
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json")
            .send({
                title: "new title",
                tag: "new tag",
                completed: true,
            });
        expect(putRes.statusCode).toBe(200);
    });
});
