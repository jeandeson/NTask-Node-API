import { inject } from "inversify";
import { TYPES } from "../data/symbols";
import { IAuthService } from "../types/interfaces/auth/passportAuthenticator";
import { controller, httpPost } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";
import { InternalServerError } from "../errors/internalServer";
import { loginSchema } from "../data/schemas/loginSchema";
import { schemaValidator } from "../middlewares/schemaValidator";

@controller("/auth")
export class AuthController {
    private passportAuthenticator: IAuthService;

    constructor(@inject(TYPES.AuthService) passportAuthenticator: IAuthService) {
        this.passportAuthenticator = passportAuthenticator;
    }

    @httpPost("/login", schemaValidator(loginSchema))
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await this.passportAuthenticator.authenticate(req);
            const jwtToken = this.passportAuthenticator.generateJwtToken(userId);
            return res.status(200).json({ token: jwtToken });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            } else {
                return next(new InternalServerError());
            }
        }
    }
}
