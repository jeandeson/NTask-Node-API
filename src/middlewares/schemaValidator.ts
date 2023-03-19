import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function schemaValidator(schema: Joi.Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        req.body = value;
        return next();
    };
}
