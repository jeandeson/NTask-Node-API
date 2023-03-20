import { ITask, IResponseTaskDTO, IRequestCreateTaskDTO, IUpdateRequestTaskDTO } from "./task";

export interface ITaskRepository {
    findAll(id: number): Promise<ITask[]>;
    findById(id: number): Promise<ITask | null>;
    post(task: IRequestCreateTaskDTO): Promise<ITask>;
    put(id: number, task: IUpdateRequestTaskDTO): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
}
