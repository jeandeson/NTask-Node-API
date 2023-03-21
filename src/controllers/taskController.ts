import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { TYPES } from "../data/symbols";
import { schemaValidator } from "../middlewares/schemaValidator";
import { createTaskSchema, updateTaskSchema } from "../data/schemas/taskSchema";
import { ITaskController } from "../types/interfaces/task/taskController";
import { HttpError } from "../errors/httpError";
import { InternalServerError } from "../errors/internalServer";
import { paramsValidator } from "../middlewares/paramsValidator";
import { ITaskService } from "../types/interfaces/task/taskService";
import { IAuthService } from "../types/interfaces/auth/passportAuthenticator";
import { RequestCreateTaskDTO, UpdateRequestTaskDTO } from "../data/DTOs/taskDTO";

@controller("/task")
export class TaskController implements ITaskController {
    constructor(
        @inject(TYPES.TaskService) private taskService: ITaskService,
        @inject(TYPES.AuthService) private passportAuthenticator: IAuthService
    ) {}

    @httpGet("/getAll")
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const id = await this.passportAuthenticator.authenticateToken(req);
            const responseTasksDTO = await this.taskService.getAll(id);
            res.status(200).json(responseTasksDTO);
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
            const responseTaskDTO = await this.taskService.getById(parseInt(id));
            res.status(200).json(responseTaskDTO);
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
            const createTaskDTO = new RequestCreateTaskDTO({ userId: userId, tag: req.body.tag, title: req.body.title });
            const responseTaskDT = await this.taskService.post(createTaskDTO);
            res.status(201).json(responseTaskDT);
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
            const updateRequestTaskDTO = new UpdateRequestTaskDTO(req.body);
            const affectedCount = await this.taskService.put(parseInt(req.params.id), updateRequestTaskDTO);
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
