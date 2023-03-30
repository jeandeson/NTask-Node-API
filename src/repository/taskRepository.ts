import { inject } from "inversify";
import { ITask, IUpdateRequestTaskDTO, IRequestCreateTaskDTO } from "../types/interfaces/task/task";
import { ITaskRepository } from "../types/interfaces/task/taskRepository";
import { Task } from "../models/task";
import { TYPES } from "../data/symbols";

export class TaskRepository implements ITaskRepository {
    constructor(@inject(TYPES.Task) private task: typeof Task) {}

    async findAll(id: number): Promise<ITask[]> {
        const tasks = await this.task.findAll({ where: { userId: id } });
        return tasks;
    }

    async findById(id: number): Promise<ITask | null> {
        const task = await this.task.findOne({ where: { id: id } });
        return task;
    }

    async post(task: IRequestCreateTaskDTO): Promise<ITask> {
        const createdTask = await this.task.create({ ...task });
        return createdTask;
    }

    async put(id: number, task: IUpdateRequestTaskDTO): Promise<[affectedCount: number]> {
        const affectedCount = await this.task.update({ ...task }, { where: { id } });
        return affectedCount;
    }

    async delete(id: number): Promise<number> {
        const affectedCount = this.task.destroy({ where: { id } });
        return affectedCount;
    }
}
