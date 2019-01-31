import { AuthChecker } from "type-graphql";
import { Config } from "apollo-server-express";

export const authChecker: AuthChecker<Config["context"]> = (
  { context: { req } },
  roles
) => {
  if (roles.length === 0) {
    return req.session.userId !== undefined;
  }

  if (!req.session.userId) {
    return false;
  }

  if (req.session.userRole === roles) {
    return true;
  }

  return false;
};
