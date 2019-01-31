import { Resolver, Authorized, Ctx, Mutation } from "type-graphql";

import { User } from "../../models/User";
import { Config } from "apollo-server-express";
// tslint:disable-next-line
require("dotenv").config();

@Resolver(User)
export class LogoutResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Config["context"]): Promise<boolean> {
    ctx.req.session.destroy();
    return await !!ctx.res.clearCookie(process.env.SESSION_NAME);
  }
}
