import { NextFunction, Request, Response } from "express";
import { IUserController } from "../types/interfaces/user/userController";
import { IUserService } from "../types/interfaces/user/userService";
import { TYPES } from "../data/symbols";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { schemaValidator } from "../middlewares/schemaValidator";
import { createUserSchema } from "../data/schemas/userSchema";
import { InternalServerError } from "../errors/internalServer";
import { HttpError } from "../errors/httpError";
import { paramsValidator } from "../middlewares/paramsValidator";
import { IPassportAuthenticator } from "../types/interfaces/auth/passportAuthenticator";
import { RequestCreateUserDTO } from "../data/DTOs/userDTO";

@controller("/user")
export default class UserController implements IUserController {
    constructor(
        @inject(TYPES.UserService) private userService: IUserService,
        @inject(TYPES.PassportAuthenticator) private passportAuthenticator: IPassportAuthenticator
    ) {}

    @httpGet("/getById")
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await this.passportAuthenticator.authenticateToken(req);
            const responseUserDTO = await this.userService.getById(userId);
            res.status(200).json(responseUserDTO);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                next(new InternalServerError());
            }
        }
    }

    @httpPost("/create", schemaValidator(createUserSchema))
    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const createUserDTO = new RequestCreateUserDTO(req.body);
            const responseUserDTO = await this.userService.post(createUserDTO);
            res.status(201).json(responseUserDTO);
        } catch (error) {
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
            const userId = await this.passportAuthenticator.authenticateToken(req);
            const affectedRows = await this.userService.delete(userId);
            return res.status(200).json(affectedRows);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                next(new InternalServerError());
            }
        }
    }
}
