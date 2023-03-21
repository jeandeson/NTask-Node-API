import { ContainerModule, decorate, injectable } from "inversify";
import { TYPES } from "../../data/symbols";
import { TaskService } from "../../services/taskService";
import { ITaskService } from "../../types/interfaces/task/taskService";
import { IUserService } from "../../types/interfaces/user/userService";
import { UserService } from "../../services/userService";
import { IAuthService } from "../../types/interfaces/auth/passportAuthenticator";
import { AuthService } from "../../services/authService";

decorate(injectable(), TaskService);
decorate(injectable(), UserService);
decorate(injectable(), AuthService);

const servicesContainer = new ContainerModule((bind) => {
    bind<IAuthService>(TYPES.AuthService).to(AuthService);
    bind<ITaskService>(TYPES.TaskService).to(TaskService);
    bind<IUserService>(TYPES.UserService).to(UserService);
});

export { servicesContainer };
