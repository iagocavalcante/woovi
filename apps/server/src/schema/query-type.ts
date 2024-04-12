import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { nodeField, nodesField } from "../type-register";
import { TodoConnection } from "../todos/todo-type";
import { connectionArgs } from "@entria/graphql-mongo-helpers";
import { TodoLoader } from "../todos/todo-loader";

const todos: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(TodoConnection.connectionType),
  args: { ...connectionArgs },
  resolve: async (_root, _args, context) =>
    await TodoLoader.loadAll(context, _args),
};

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "root of all queries",
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    todos,
  }),
});
