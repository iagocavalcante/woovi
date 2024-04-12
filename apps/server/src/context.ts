import { getDataLoaders } from "./loader-register";
import { ParameterizedContext } from "koa";

interface ContextVars {
  ctx?: ParameterizedContext;
}

export const context = ({ ctx }: ContextVars) => {
  const dataloaders = getDataLoaders();

  return {
    ctx,
    dataloaders,
  } as const;
};
