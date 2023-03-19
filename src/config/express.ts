import { Application } from "express";

export default function (app: Application) {
    app.set("port", process.env.port);
    app.set("json spaces", 4);
}
