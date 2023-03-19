import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().min(4).required(),
    tag: Joi.string().min(3).required(),
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(4).required(),
    tag: Joi.string().min(3).required(),
    completed: Joi.bool().required(),
});
