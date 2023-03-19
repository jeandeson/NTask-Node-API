import { ICreateTaskDTO, IUpdateTaskDTO } from "../../types/interfaces/task/task";

export class CreateTaskDTO implements ICreateTaskDTO {
    userId: number;
    title: string;
    tag: string;
    constructor(payload: { userId: number; title: string; tag: string }) {
        this.userId = payload.userId;
        this.title = payload.title;
        this.tag = payload.tag;
    }
}

export class UpdateTaskDTO implements IUpdateTaskDTO {
    title: string;
    tag: string;
    completed: boolean;
    constructor(payload: { title: string; tag: string; completed: boolean }) {
        this.title = payload.title;
        this.tag = payload.tag;
        this.completed = payload.completed;
    }
}
