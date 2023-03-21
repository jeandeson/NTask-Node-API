import { ContainerModule, decorate, injectable } from "inversify";
import { TYPES } from "../../data/symbols";
import { TaskRepository } from "../../repository/taskRepository";
import { ITaskRepository } from "../../types/interfaces/task/taskRepository";
import UserRepository from "../../repository/userRepository";
import { IUserRepository } from "../../types/interfaces/user/userRepository";

decorate(injectable(), TaskRepository);
decorate(injectable(), UserRepository);

const repositoriesContainer = new ContainerModule((bind) => {
    bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);
    bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
});

export { repositoriesContainer };
