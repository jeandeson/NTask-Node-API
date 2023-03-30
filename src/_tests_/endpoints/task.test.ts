import app from "../../../app";
import request from "supertest";
import { closeTestDB, initTestDB } from "../sequelize";
import { Sequelize } from "sequelize";
import { getTestJwtToken } from "../utils/testUtils";

describe("ENDPOINT /task/", function () {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await initTestDB();
    });

    afterEach(async () => {
        await closeTestDB();
    });

    it("POST create - it should create a new task", async () => {
        let validToken = await getTestJwtToken(sequelize);
        const createTaskDTO = { title: "Wash Car", tag: "Home" };
        const createTaskRes = await request(app)
            .post("/task/create")
            .set("Authorization", `Bearer ${validToken}`)
            .set("Accept", "application/json")
            .send(createTaskDTO);
        expect(createTaskRes.statusCode).toBe(201);
    });
    it("GET getById - it should return a task and status 200", async () => {
        let validToken = await getTestJwtToken(sequelize);
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
        let validToken = await getTestJwtToken(sequelize);
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
