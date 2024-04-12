import { createLoader } from "@entria/graphql-mongo-helpers";

import { registerLoader } from "../loader-register";
import { TodoModel } from "./todo-model";

const { Wrapper, getLoader, clearCache, load, loadAll } = createLoader({
  model: TodoModel,
  loaderName: "TodoLoader",
});

registerLoader("TodoLoader", getLoader);

export const TodoLoader: any = {
  Todo: Wrapper,
  getLoader,
  clearCache,
  load,
  loadAll,
};
