import { Container } from "inversify";
import { servicesContainer } from "./containers/servicesContainer";
import { repositoriesContainer } from "./containers/repositoriesContainer";
import { modelsContainer } from "./containers/modelsContainer";
import { controllersContainer } from "./containers/controllersContainer";

const iocContainer = new Container();

iocContainer.load(controllersContainer, servicesContainer, repositoriesContainer, modelsContainer);

export { iocContainer };
