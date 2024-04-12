import Koa, { ParameterizedContext, Request, Response } from "koa";
import logger from "koa-logger";
import cors from "kcors";
import bodyParser from "koa-bodyparser";
import { OptionsData, graphqlHTTP } from "koa-graphql";
import koaPlayground from "graphql-playground-middleware-koa";
import Router from "@koa/router";
import { context } from "./context";
import { schema } from "./schema/schema";

const router = new Router();
const server = new Koa();

server.use(bodyParser());

const graphQlSettingsPerReq = async (
  _req: Request,
  _res: Response,
  ctx: ParameterizedContext,
): Promise<OptionsData> => {
  return {
    graphiql: {
      headerEditorEnabled: true,
      shouldPersistHeaders: true,
    },
    schema,
    pretty: true,
    context: context({
      ctx,
    }),
    customFormatErrorFn: ({ message, locations, stack }) => {
      /* eslint-disable no-console */
      console.log(message);
      console.log(locations);
      console.log(stack);
      /* eslint-enable no-console */

      return {
        message,
        locations,
        stack,
      };
    },
  };
};

const graphQlServer = graphqlHTTP(graphQlSettingsPerReq);

router.all("/", graphQlServer);
router.all(
  "/",
  koaPlayground({
    endpoint: "/",
  }),
);

server.use(cors({ credentials: true }));
server.use(logger());

server.use(router.routes()).use(router.allowedMethods());

export { server };
