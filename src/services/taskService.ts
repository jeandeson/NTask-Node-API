import { inject, injectable } from "inversify";
import { TYPES } from "../data/symbols";
import { IResponseTaskDTO, IUpdateRequestTaskDTO, IRequestCreateTaskDTO } from "../types/interfaces/task/task";
import { ITaskService } from "../types/interfaces/task/taskService";
import { ITaskRepository } from "../types/interfaces/task/taskRepository";
import { NotFoundError } from "../errors/notFound";
import { BadRequestError } from "../errors/badRequest";
import { InternalServerError } from "../errors/internalServer";
import { ResponseTaskDTO } from "../data/DTOs/taskDTO";

export class TaskService implements ITaskService {
    constructor(@inject(TYPES.TaskRepository) private taskRepository: ITaskRepository) {}

    async getAll(id: number): Promise<IResponseTaskDTO[]> {
        const allTasks = await this.taskRepository.findAll(id);
        if (allTasks.length === 0) {
            throw new NotFoundError("Theres no tasks to retrieve");
        }
        return allTasks.map((task) => new ResponseTaskDTO(task.dataValues));
    }

    async getById(id: number): Promise<IResponseTaskDTO> {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError(`Task with id ${id} not found.`);
        }
        return new ResponseTaskDTO(task.dataValues);
    }

    async post(task: IRequestCreateTaskDTO): Promise<IResponseTaskDTO> {
        const createdTask = await this.taskRepository.post(task);
        return new ResponseTaskDTO(createdTask.dataValues);
    }

    async put(id: number, task: IUpdateRequestTaskDTO): Promise<[affectedCount: number]> {
        const affectedCount = await this.taskRepository.put(id, task);
        if (affectedCount[0] <= 0) {
            throw new BadRequestError(`unable to update the task with id: ${id}`);
        }
        return this.taskRepository.put(id, task);
    }

    async delete(id: number): Promise<number> {
        const affectedCount = await this.taskRepository.delete(id);
        if (affectedCount <= 0) {
            throw new NotFoundError("task not found");
        }
        return affectedCount;
    }
}
