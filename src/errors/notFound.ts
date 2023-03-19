import { HttpError } from "./httpError";

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(404, message || "Not Found");
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
