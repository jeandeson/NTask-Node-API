import cors from "cors";
import { Application } from "express";
import { corsOptions } from "./cors";

export default function (app: Application) {
    app.set("port", process.env.port);
    app.set("json spaces", 4);
    app.use(cors(corsOptions));
}
