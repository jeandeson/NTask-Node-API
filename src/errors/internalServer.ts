import { HttpError } from "./httpError";

export class InternalServerError extends HttpError {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
