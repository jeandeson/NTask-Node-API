import { Model } from "sequelize/types/model";

export interface ICreateTaskDTO {
    userId: number;
    title: string;
    tag: string;
}

export interface IUpdateTaskDTO {
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
