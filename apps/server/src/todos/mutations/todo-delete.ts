import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { GraphQLContext } from "../../graphql/context";
import { getObjectId, successField } from "@entria/graphql-mongo-helpers";
import { TodoModel } from "../todo-model";
import { TodoLoader } from "../todo-loader";

export const todoDeleteMutation = mutationWithClientMutationId({
  name: "TodoDelete",
  inputFields: {
    todoId: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ todoId }, ctx: GraphQLContext) => {
    // if (!ctx.user) {
    //   throw new Error("You must be logged in to delete an todo");
    // }

    const foundAppointment = await TodoModel.findById(getObjectId(todoId));

    if (!foundAppointment) {
      throw new Error("This todo does not exist");
    }

    await TodoModel.findOneAndDelete({ _id: foundAppointment });

    return {
      success: "Appointment successfully deleted",
    };
  },
  outputFields: {
    todoId: {
      type: GraphQLID,
      resolve: async ({ id }, _, context) => {
        const todo = await TodoLoader.load(context, id);

        if (!todo) return null;

        return toGlobalId("Todo", todo.id);
      },
    },
    ...successField,
  },
});
