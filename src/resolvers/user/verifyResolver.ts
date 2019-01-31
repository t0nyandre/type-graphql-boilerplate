import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Config } from "apollo-server-express";

import { VerifyInput } from "./verifyInput";
import { redis, confirmUserPrefix } from "../../../config/redis";
import {
  invalidTokenError,
  accountAlreadyVerifiedError,
} from "../../utils/errorMessages";
import { User } from "../../models/User";

@Resolver(User)
export class VerifyResolver {
  @Mutation(() => Boolean)
  async verify(
    @Arg("verifyData") verifyData: VerifyInput,
    @Ctx() ctx: Config["context"]
  ): Promise<boolean> {
    const [[, id], [,]] = await redis
      .pipeline()
      .get(confirmUserPrefix + verifyData.token)
      .del(confirmUserPrefix + verifyData.token)
      .exec();

    if (!id) {
      throw invalidTokenError();
    }

    const user = await User.findOneOrFail(id!);

    if (user.confirmed) {
      throw accountAlreadyVerifiedError();
    }

    user.confirmed = true;
    await user.save();

    ctx.req.session.userId = user.id;
    ctx.req.session.userRole = user.role;

    return true;
  }
}
