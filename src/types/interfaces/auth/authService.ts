import e, { NextFunction, Request, Response } from "express";
import { IUser } from "../user/user";
import passportLocal from "passport-local";
import { Strategy } from "passport-jwt";

export interface IAuthService {
    initialize(): e.Handler;
    localStrategy: passportLocal.Strategy;
    jwtStrategy: Strategy;
    authenticate(req: Request): Promise<number>;
    authenticateToken(req: Request): Promise<number>;
    generateJwtToken(id: number): string;
    generateResetToken(email: string): Promise<string>;
    resetPassword(token: string, password: string): Promise<number[]>;
    validateToken(token: string): Promise<IUser>;
}
