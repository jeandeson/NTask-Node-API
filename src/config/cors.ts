import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost/3001"],
};
