import { ITask, IResponseTaskDTO, IRequestCreateTaskDTO, IUpdateRequestTaskDTO } from "./task";

export interface ITaskService {
    getAll(id: number): Promise<IResponseTaskDTO[]>;
    getById(id: number): Promise<IResponseTaskDTO>;
    post(task: IRequestCreateTaskDTO): Promise<IResponseTaskDTO>;
    put(id: number, task: IUpdateRequestTaskDTO): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
}
