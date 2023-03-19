import { NextFunction, Request, Response } from "express";

export interface IUserController {
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    post(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
