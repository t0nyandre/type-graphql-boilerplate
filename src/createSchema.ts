import { buildSchema } from "type-graphql";
import { authChecker } from "./utils/authChecker";

export const createSchema = async () =>
  await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*Resolver.ts"],
    authChecker,
  });
