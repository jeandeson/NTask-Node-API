import passportCfg from "../config/passport";
import { inject, injectable } from "inversify";
import { TYPES } from "../data/symbols";
import { IUserRepository } from "../types/interfaces/user/userRepository";
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt, { ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthService } from "../types/interfaces/auth/authService";
import { NotFoundError } from "../errors/notFound";
import { BadRequestError } from "../errors/badRequest";
import { Request } from "express";
import { Unauthorized } from "../errors/unauthorized";
import { InternalServerError } from "../errors/internalServer";
import { IUser } from "../types/interfaces/user/user";
import { HttpError } from "../errors/httpError";

interface DecodedToken extends JwtPayload {
    sub: string;
}

export class AuthService implements IAuthService {
    public localStrategy: passportLocal.Strategy;
    public jwtStrategy: passportJwt.Strategy;

    constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {
        passport.use(
            new passportJwt.Strategy(
                { secretOrKey: passportCfg.jwtSecret, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() },
                async (jwt_payload, done) => {
                    try {
                        const user = await userRepository.getById(jwt_payload.sub);
                        if (user) return done(null, user.dataValues.id);
                        else return done(new Unauthorized("invalid token or expired"), false);
                    } catch (err) {
                        return done(err);
                    }
                }
            )
        );
        passport.use(
            new passportLocal.Strategy(
                { usernameField: "email", passwordField: "password", session: false },
                async (email, password, done) => {
                    try {
                        const user = await this.userRepository.getByEmail(email);
                        if (!user) {
                            return done(new NotFoundError("user not found"), false);
                        }
                        const match = bcrypt.compareSync(password, user.password);
                        if (!match) {
                            return done(new BadRequestError("invalid password"), false);
                        }

                        return done(null, user.dataValues.id);
                    } catch (error) {
                        done(error);
                    }
                }
            )
        );
    }

    initialize = () => {
        return passport.initialize();
    };

    authenticate(req: Request): Promise<number> {
        return new Promise((resolve, reject) => {
            passport.authenticate("local", { session: false }, (err: unknown, userId: number) => {
                if (err) {
                    reject(new BadRequestError("auth error"));
                }
                if (!userId) {
                    reject(new NotFoundError("user not found."));
                }
                resolve(userId);
            })(req);
        });
    }

    generateJwtToken(id: number) {
        const payload = { sub: id };
        const token = jwt.sign(payload, passportCfg.jwtSecret, { expiresIn: "1d" });
        return token;
    }

    async generateResetToken(email: string) {
        const user = await this.userRepository.getByEmail(email);
        if (!user) {
            throw new NotFoundError("Email not found");
        }
        const token = this.generateJwtToken(user.id);
        const passwordResetTokenHash = await bcrypt.hash(token, 10);
        const passwordResetExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.userRepository.updatePasswordResetTokenHash(user.id, passwordResetTokenHash, passwordResetExpiresAt);
        return token;
    }

    verifyToken(token: string): DecodedToken {
        try {
            return jwt.verify(token, passportCfg.jwtSecret) as DecodedToken;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Unauthorized("Token expired");
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new Unauthorized("Token content doesn't match");
            }
            throw error;
        }
    }

    async validateToken(token: string): Promise<IUser> {
        const { sub: id } = this.verifyToken(token);
        const user = await this.userRepository.getById(parseInt(id));
        if (user == null || user.passwordResetTokenHash == null || user.passwordResetExpiresAt == null) {
            if (!user) {
                throw new BadRequestError("user not found");
            }
            throw new BadRequestError("password reset token has not yet been generated");
        }
        const match = bcrypt.compareSync(token, user.passwordResetTokenHash);
        const isValid = user.passwordResetExpiresAt > new Date();
        if (!match || !isValid) {
            if (!isValid) {
                throw new Unauthorized("Token expired");
            }
            throw new Unauthorized("Token content doesn't match");
        }
        return user;
    }

    async resetPassword(token: string, password: string) {
        const user = await this.validateToken(token);
        return await this.userRepository.updatePassword(user.id, password);
    }

    authenticateToken(req: Request): Promise<number> {
        return new Promise((resolve, reject) => {
            passport.authenticate("jwt", { session: false }, (err: unknown, userId: number) => {
                if (err) {
                    reject(err);
                }
                if (!userId) {
                    reject(new Unauthorized("invalid token or expired"));
                }
                resolve(userId);
            })(req);
        });
    }
}
