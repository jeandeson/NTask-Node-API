export interface ILogin {
    email: string;
    password: string;
}

interface IDecodedToken extends JwtPayload {
    sub: string;
}
