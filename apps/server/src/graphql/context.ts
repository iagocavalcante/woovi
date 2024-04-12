import { ParameterizedContext } from "koa";
import { DataLoaders } from "../loader-register";

export interface GraphQLContext {
  ctx: ParameterizedContext;
  dataloaders: DataLoaders;
}
