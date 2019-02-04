import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as session from "express-session";
import { ApolloServer } from "apollo-server-express";
import * as cors from "cors";
import * as connectRedis from "connect-redis";

import { DefaultConnection } from "../config/typeorm";
import { createSchema } from "./createSchema";
import { redis } from "../config/redis";
import { serverURL, serverPORT } from "../config/default";
// tslint:disable-next-line
require("dotenv").config();

const { SESSION_SECRET, SESSION_NAME, NODE_ENV } = process.env;

const startServer = async () => {
  await createConnection(DefaultConnection);

  const schema = await createSchema();

  const app = express();
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    }),
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: NODE_ENV === "prod",
      },
      name: SESSION_NAME!,
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET!,
      store: new RedisStore({
        client: redis as any,
      }),
    })
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
    }),
  });

  server.applyMiddleware({
    app,
    path: "/",
    cors: false,
  });

  app.listen({ port: serverPORT }, () =>
    console.log(`🚀 Server is starting on ${serverURL}${server.graphqlPath} ..`)
  );
};

startServer().catch(error => {
  console.error(error);
});
