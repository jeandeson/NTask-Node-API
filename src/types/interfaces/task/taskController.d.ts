import { NextFunction, Request, Response } from "express";

export interface ITaskController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    post(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    put(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
