import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response {
    if (error instanceof HttpError) {
        return res.status(400).json({ message: error.message });
    }

    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
}
