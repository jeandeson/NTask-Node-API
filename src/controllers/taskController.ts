import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { TYPES } from "../data/symbols";
import { TaskService } from "../services/taskService";
import { ICreateTaskDTO, IUpdateTaskDTO } from "../types/interfaces/task/task";
import { schemaValidator } from "../middlewares/schemaValidator";
import { createTaskSchema, updateTaskSchema } from "../data/schemas/taskSchema";
import { ITaskController } from "../types/interfaces/task/taskController";
import { HttpError } from "../errors/httpError";
import { InternalServerError } from "../errors/internalServer";
import { paramsValidator } from "../middlewares/paramsValidator";
import { ITaskService } from "../types/interfaces/task/taskService";
import { IPassportAuthenticator } from "../types/interfaces/auth/passportAuthenticator";

@controller("/task")
export class TaskController implements ITaskController {
    constructor(
        @inject(TYPES.TaskService) private taskService: ITaskService,
        @inject(TYPES.PassportAuthenticator) private passportAuthenticator: IPassportAuthenticator
    ) {}

    @httpGet("/getAll")
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const id = await this.passportAuthenticator.authenticateToken(req);
            const allTasks = await this.taskService.getAll(id);
            res.status(200).json(allTasks);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                next(new InternalServerError());
            }
        }
    }

    @httpGet("/getById/:id")
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            await this.passportAuthenticator.authenticateToken(req);
            const { id } = req.params;
            const task = await this.taskService.getById(parseInt(id));
            res.status(200).json(task.dataValues);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                next(new InternalServerError());
            }
        }
    }

    @httpPost("/create", schemaValidator(createTaskSchema))
    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await this.passportAuthenticator.authenticateToken(req);
            const createTaskDTO: ICreateTaskDTO = { userId: userId, tag: req.body.tag, title: req.body.title };
            const createdTask = await this.taskService.post(createTaskDTO);
            res.status(201).json({ ...createdTask.dataValues });
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                next(new InternalServerError());
            }
        }
    }

    @httpPut("/update/:id", schemaValidator(updateTaskSchema), paramsValidator())
    async put(req: Request, res: Response, next: NextFunction) {
        try {
            await this.passportAuthenticator.authenticateToken(req);
            const { id } = req.params;
            const body: IUpdateTaskDTO = req.body;
            const affectedCount = await this.taskService.put(parseInt(id), body);
            res.status(200).json({ affectedCount });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                next(new InternalServerError());
            }
        }
    }

    @httpDelete("/delete", paramsValidator())
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await this.passportAuthenticator.authenticate(req);
            const affectedCount = await this.taskService.delete(userId);
            res.status(200).json({ affectedCount });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                next(new InternalServerError());
            }
        }
    }
}
