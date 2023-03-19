import { HttpError } from "./httpError";

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(400, message || "Bad Request");
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
