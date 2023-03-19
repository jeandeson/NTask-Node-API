import { Container } from "inversify";
import { TYPES } from "../data/symbols";
import { User } from "../models/user";
import { Task } from "../models/task";
import { TaskRepository } from "../repository/taskRepository";
import { TaskService } from "../services/taskService";
import { ITaskRepository } from "../types/interfaces/task/taskRepository";
import { ITaskService } from "../types/interfaces/task/taskService";
import { IUserService } from "../types/interfaces/user/userService";
import { UserService } from "../services/userService";
import { IUserRepository } from "../types/interfaces/user/userRepository";
import UserRepository from "../repository/userRepository";
import { IPassportAuthenticator } from "../types/interfaces/auth/passportAuthenticator";
import { PassportAuthenticator } from "../auth/passportAuth";

let container = new Container();
container.bind<typeof User>(TYPES.User).toConstantValue(User);
container.bind<typeof Task>(TYPES.Task).toConstantValue(Task);
container.bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<ITaskService>(TYPES.TaskService).to(TaskService);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IPassportAuthenticator>(TYPES.PassportAuthenticator).to(PassportAuthenticator);

export { container };
