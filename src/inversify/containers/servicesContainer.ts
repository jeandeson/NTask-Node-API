import { ContainerModule, decorate, injectable } from "inversify";
import { TYPES } from "../../data/symbols";
import { TaskService } from "../../services/taskService";
import { ITaskService } from "../../types/interfaces/task/taskService";
import { IUserService } from "../../types/interfaces/user/userService";
import { UserService } from "../../services/userService";
import { IAuthService } from "../../types/interfaces/auth/authService";
import { AuthService } from "../../services/authService";
import { MailService } from "../../services/mailService";
import { IMailService } from "../../types/interfaces/mail/mailService";

decorate(injectable(), TaskService);
decorate(injectable(), UserService);
decorate(injectable(), AuthService);
decorate(injectable(), MailService);

const servicesContainer = new ContainerModule((bind) => {
    bind<IAuthService>(TYPES.AuthService).to(AuthService);
    bind<ITaskService>(TYPES.TaskService).to(TaskService);
    bind<IUserService>(TYPES.UserService).to(UserService);
    bind<IMailService>(TYPES.MailService).to(MailService);
});

export { servicesContainer };
