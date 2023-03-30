import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response {
    try {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ message: error.message });
        } else if (error instanceof Error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        } else {
            console.error("Unknown error occurred:", error);
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    } catch (err) {
        console.error("Unknown error occurred:", err);
        return res.status(500).json({ message: "Unknown error occurred" });
    }
}
