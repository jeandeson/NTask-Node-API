import { ContainerModule, decorate, injectable } from "inversify";
import { AuthController } from "../../controllers/authController";
import { TaskController } from "../../controllers/taskController";
import { UserController } from "../../controllers/userController";

const controllersContainer = new ContainerModule((bind) => {
    bind(AuthController).toSelf();
    bind(TaskController).toSelf();
    bind(UserController).toSelf();
});

export { controllersContainer };
