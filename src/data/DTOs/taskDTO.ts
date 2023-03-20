import { IResponseTaskDTO, IRequestCreateTaskDTO, IUpdateRequestTaskDTO } from "../../types/interfaces/task/task";

export class RequestCreateTaskDTO implements IRequestCreateTaskDTO {
    userId: number;
    title: string;
    tag: string;
    constructor(payload: { userId: number; title: string; tag: string }) {
        this.userId = payload.userId;
        this.title = payload.title;
        this.tag = payload.tag;
    }
}

export class ResponseTaskDTO implements IResponseTaskDTO {
    id: number;
    userId: number;
    title: string;
    createdAt: Date;
    completed: boolean;
    tag: string;

    constructor(payload: { id: number; userId: number; title: string; tag: string; completed: boolean; createdAt: Date }) {
        this.id = payload.id;
        this.userId = payload.userId;
        this.title = payload.title;
        this.tag = payload.tag;
        this.createdAt = payload.createdAt;
        this.completed = payload.completed;
    }
}

export class UpdateRequestTaskDTO implements IUpdateRequestTaskDTO {
    title: string;
    tag: string;
    completed: boolean;
    constructor(payload: { title: string; tag: string; completed: boolean }) {
        this.title = payload.title;
        this.tag = payload.tag;
        this.completed = payload.completed;
    }
}
