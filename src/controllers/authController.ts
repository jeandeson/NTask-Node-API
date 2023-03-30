import { inject } from "inversify";
import { TYPES } from "../data/symbols";
import { IAuthService } from "../types/interfaces/auth/authService";
import { controller, httpPost } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../data/schemas/loginSchema";
import { schemaValidator } from "../middlewares/schemaValidator";
import { IMailService } from "../types/interfaces/mail/mailService";
import { forgotPasswordSchema } from "../data/schemas/forgotPassSchema";
import { resetPasswordSchema } from "../data/schemas/resetPassSchema";

@controller("/auth")
export class AuthController {
    private authService: IAuthService;
    private mailService: IMailService;

    constructor(@inject(TYPES.AuthService) authService: IAuthService, @inject(TYPES.MailService) mailService: IMailService) {
        this.authService = authService;
        this.mailService = mailService;
    }

    @httpPost("/login", schemaValidator(loginSchema))
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await this.authService.authenticate(req);
            const jwtToken = this.authService.generateJwtToken(userId);
            return res.status(200).json({ token: jwtToken });
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/forgotPassword", schemaValidator(forgotPasswordSchema))
    async generateResetToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const token = await this.authService.generateResetToken(email);
            const result = this.mailService.sendMail(email, "Ntask reset token", token);
            return res.status(200).send({ message: `${result}` });
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/resetPassword/:token", schemaValidator(resetPasswordSchema))
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const affectedCount = await this.authService.resetPassword(token, password);
            return res.status(200).send({ affectedCount });
        } catch (error) {
            throw error;
        }
    }
}
