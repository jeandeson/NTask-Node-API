import { ContainerModule, decorate, injectable } from "inversify";
import { User } from "../../models/user";
import { Task } from "../../models/task";
import { Model } from "sequelize";
import { TYPES } from "../../data/symbols";

decorate(injectable(), Model);

const modelsContainer = new ContainerModule((bind) => {
    bind<typeof User>(TYPES.User).toConstantValue(User);
    bind<typeof Task>(TYPES.Task).toConstantValue(Task);
});

export { modelsContainer };
