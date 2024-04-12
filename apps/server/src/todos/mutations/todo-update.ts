import { getObjectId, successField } from "@entria/graphql-mongo-helpers";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { GraphQLContext } from "../../graphql/context";
import { TodoLoader } from "../todo-loader";
import { TodoModel } from "../todo-model";
import { TodoConnection } from "../todo-type";

const todoUpdateMutation = mutationWithClientMutationId({
  name: "TodoUpdate",
  inputFields: {
    todoId: { type: new GraphQLNonNull(GraphQLString) },
    isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  mutateAndGetPayload: async (
    { todoId, ...updatedFields },
    ctx: GraphQLContext,
  ) => {
    // if (!ctx.user) {
    //   throw new Error("You must be logged in to update an appointment");
    // }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      getObjectId(todoId),
      {
        ...updatedFields,
        completedAt: updatedFields.isDone ? new Date() : null,
      },
      { new: true },
    );

    if (!updatedTodo) {
      throw new Error("This appointment does not exist.");
    }

    return {
      id: updatedTodo._id.toString(),
      success: "Appointment updated successfully",
    };
  },
  outputFields: {
    appointmentEdge: {
      type: TodoConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const todo = await TodoLoader.load(context, id);
        if (!todo) return null;

        return {
          cursor: toGlobalId("Appointment", todo._id),
          node: todo,
        };
      },
      ...successField,
    },
  },
});

export { todoUpdateMutation };
