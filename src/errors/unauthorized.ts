import { HttpError } from "./httpError";

export class Unauthorized extends HttpError {
    constructor(message: string) {
        super(401, message || "unauthorized");
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
