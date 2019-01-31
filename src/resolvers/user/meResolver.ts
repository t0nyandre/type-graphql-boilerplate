import { Resolver, Authorized, Query, Ctx } from "type-graphql";

import { User } from "../../models/User";
import { Config } from "apollo-server-express";

@Resolver(User)
export class MeResolver {
  @Authorized()
  @Query(() => User)
  async me(@Ctx() ctx: Config["context"]): Promise<User> {
    return await User.findOneOrFail(ctx.req.session.userId);
  }
}
