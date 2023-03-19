import * as dotenv from "dotenv";

const getConfig = (() => {
    if (process.env.NODE_ENV === "development") {
        return { path: "./env/dev.env" };
    } else {
        return { path: "./env/test.env" };
    }
})();

dotenv.config(getConfig);
