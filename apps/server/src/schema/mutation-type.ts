import { GraphQLObjectType } from "graphql";
import * as todoCreateMutation from "../todos/mutations/todo-create";
import * as todoDeleteMutation from "../todos/mutations/todo-delete";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root of mutations",
  fields: () => ({
    ...todoCreateMutation,
    ...todoDeleteMutation,
  }),
});
