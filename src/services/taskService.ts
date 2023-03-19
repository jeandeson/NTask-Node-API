import { inject, injectable } from "inversify";
import { TYPES } from "../data/symbols";
import { ITask, ICreateTaskDTO, IUpdateTaskDTO } from "../types/interfaces/task/task";
import { ITaskService } from "../types/interfaces/task/taskService";
import { ITaskRepository } from "../types/interfaces/task/taskRepository";
import { NotFoundError } from "../errors/notFound";
import { BadRequestError } from "../errors/badRequest";
import { InternalServerError } from "../errors/internalServer";

@injectable()
export class TaskService implements ITaskService {
    constructor(@inject(TYPES.TaskRepository) private taskRepository: ITaskRepository) {}

    async getAll(id: number): Promise<ITask[]> {
        try {
            const allTasks = await this.taskRepository.findAll(id);
            if (allTasks.length === 0) {
                throw new NotFoundError("Theres no tasks to retrieve");
            }
            return allTasks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id: number): Promise<ITask> {
        try {
            const task = await this.taskRepository.findById(id);
            if (!task) {
                throw new NotFoundError(`Task with id ${id} not found.`);
            }
            return task;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async post(task: ICreateTaskDTO): Promise<ITask> {
        try {
            const createdTask = await this.taskRepository.post(task);
            return createdTask;
        } catch (error) {
            console.error(error);
            throw new InternalServerError("error attempting to insert task.");
        }
    }

    async put(id: number, task: IUpdateTaskDTO): Promise<[affectedCount: number]> {
        try {
            const affectedCount = await this.taskRepository.put(id, task);
            if (affectedCount[0] <= 0) {
                throw new BadRequestError(`unable to update the task with id: ${id}`);
            }
            return this.taskRepository.put(id, task);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: number): Promise<number> {
        try {
            const affectedCount = await this.taskRepository.delete(id);
            if (affectedCount <= 0) {
                throw new NotFoundError("task not found");
            }
            return affectedCount;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
