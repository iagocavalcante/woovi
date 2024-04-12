import { GraphQLSchema } from "graphql";
import { MutationType } from "./mutation-type";
import { QueryType } from "./query-type";

const schema = new GraphQLSchema({
  mutation: MutationType,
  query: QueryType,
});

export { schema };
