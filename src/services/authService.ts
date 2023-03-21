import passportCfg from "../config/passport";
import { inject, injectable } from "inversify";
import { TYPES } from "../data/symbols";
import { IUserRepository } from "../types/interfaces/user/userRepository";
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt, { ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAuthService } from "../types/interfaces/auth/passportAuthenticator";
import { NotFoundError } from "../errors/notFound";
import { BadRequestError } from "../errors/badRequest";
import { Request } from "express";
import { Unauthorized } from "../errors/unauthorized";

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
