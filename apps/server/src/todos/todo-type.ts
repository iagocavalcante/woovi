import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Todo } from "./todo-model";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface, registerTypeLoader } from "../type-register";
import { TodoLoader } from "./todo-loader";

export const TodoType = new GraphQLObjectType<Todo>({
  name: "Todos",
  description: "Thats a todo's structure in the database.",
  fields: () => ({
    id: globalIdField("Todos"),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (todo) => todo.title,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (todo) => todo.description,
    },
    completedAt: {
      type: GraphQLString,
      resolve: (todo) => todo.completedAt,
    },
    isDone: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (todo) => todo.isDone,
    },
  }),
  interfaces: () => [nodeInterface],
});

export const TodoConnection = connectionDefinitions({
  name: "todoConnection",
  nodeType: TodoType,
});

registerTypeLoader(TodoType, TodoLoader.load);
