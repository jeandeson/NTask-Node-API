import { inject, injectable } from "inversify";
import { ITask, IResponseTaskDTO, IUpdateRequestTaskDTO, IRequestCreateTaskDTO } from "../types/interfaces/task/task";
import { ITaskRepository } from "../types/interfaces/task/taskRepository";
import { Task } from "../models/task";
import { TYPES } from "../data/symbols";
import { InternalServerError } from "../errors/internalServer";

export class TaskRepository implements ITaskRepository {
    constructor(@inject(TYPES.Task) private task: typeof Task) {}

    async findAll(id: number): Promise<ITask[]> {
        try {
            const tasks = await this.task.findAll({ where: { userId: id } });
            return tasks;
        } catch (error: unknown) {
            console.error(error);
            throw new InternalServerError("error attempting to get all tasks.");
        }
    }

    async findById(id: number): Promise<ITask | null> {
        try {
            const task = await this.task.findOne({ where: { id: id } });
            return task;
        } catch (error: unknown) {
            console.error(error);
            throw new InternalServerError("error attempting to find a task by id.");
        }
    }

    async post(task: IRequestCreateTaskDTO): Promise<ITask> {
        try {
            const createdTask = await this.task.create({ ...task });
            return createdTask;
        } catch (error: unknown) {
            console.error(error);
            throw new InternalServerError("error attempting to insert task.");
        }
    }

    async put(id: number, task: IUpdateRequestTaskDTO): Promise<[affectedCount: number]> {
        try {
            const affectedCount = await this.task.update({ ...task }, { where: { id } });
            return affectedCount;
        } catch (error: unknown) {
            console.error(error);
            throw new InternalServerError("error attempting to insert task.");
        }
    }

    async delete(id: number): Promise<number> {
        try {
            const affectedCount = this.task.destroy({ where: { id } });
            return affectedCount;
        } catch (error: unknown) {
            console.error(error);
            throw new InternalServerError("error attempting to delete task.");
        }
    }
}
