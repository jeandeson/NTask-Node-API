import { ITask, ICreateTaskDTO, IUpdateTaskDTO } from "./task";

export interface ITaskRepository {
    findAll(id: number): Promise<ITask[]>;
    findById(id: number): Promise<ITask | null>;
    post(task: ICreateTaskDTO): Promise<ITask>;
    put(id: number, task: IUpdateTaskDTO): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
}
