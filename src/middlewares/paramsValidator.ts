import { Request, Response, NextFunction } from "express";

export function paramsValidator() {
    return (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if ((id && isNaN(Number(id))) || Number(id) <= 0) {
            return res.status(400).json({ message: `invalid params: ${id}` });
        }
        return next();
    };
}
