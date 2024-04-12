import { GraphQLContext } from "./../../graphql/context";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { TodoConnection } from "../todo-type";
import { Todo, TodoModel } from "../todo-model";
import { TodoLoader } from "../todo-loader";
import { successField } from "@entria/graphql-mongo-helpers";

const todoCreateMutation = mutationWithClientMutationId({
  name: "TodoCreate",
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    isDone: { type: GraphQLBoolean },
  },
  mutateAndGetPayload: async (args: Todo, ctx: GraphQLContext) => {
    const { title, description } = args;

    // console.log(ctx.user)
    console.log(ctx);
    console.log(ctx.dataloaders);

    // if (!ctx.user) {
    //   throw new Error('You must be logged in to register an todo')
    // }

    const newTodo = await new TodoModel({
      title,
      description,
      isDone: false,
    }).save();

    return {
      id: newTodo._id.toString(),
      success: "New note has been added",
    };
  },
  outputFields: {
    todoEdge: {
      type: TodoConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const todo = await TodoLoader.load(context, id);
        if (!todo) return null;

        return {
          cursor: toGlobalId("Todo", todo._id),
          node: todo,
        };
      },
      ...successField,
    },
  },
});

export { todoCreateMutation };
