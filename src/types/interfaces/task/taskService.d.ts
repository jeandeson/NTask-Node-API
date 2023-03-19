import { ITask, ICreateTaskDTO, IUpdateTaskDTO } from "./task";

export interface ITaskService {
    getAll(id: number): Promise<ITask[]>;
    getById(id: number): Promise<ITask>;
    post(task: ICreateTaskDTO): Promise<ITask>;
    put(id: number, task: IUpdateTaskDTO): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
}
