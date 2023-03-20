import { Model } from "sequelize/types/model";

export interface IRequestCreateTaskDTO {
    userId: number;
    title: string;
    tag: string;
}

export interface IResponseTaskDTO {
    id: number;
    userId: number;
    title: string;
    createdAt: Date;
    completed: boolean;
    tag: string;
}

export interface IUpdateRequestTaskDTO {
    title: string;
    tag: string;
    completed: boolean;
}

export interface ITask extends Model {
    id: number;
    title: string;
    createdAt: Date;
    completed: boolean;
    tag: string;
}
