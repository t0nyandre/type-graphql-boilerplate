import { Resolver, Ctx, Mutation, Arg } from "type-graphql";
import * as argon2 from "argon2";

import { User } from "../../models/User";
import { Config } from "apollo-server-express";
import { redis, changePasswordUserPrefix } from "../../../config/redis";
import { invalidTokenError } from "../../utils/errorMessages";
import { ChangePasswordInput } from "./changePasswordInput";

@Resolver(User)
export class ChangePasswordResolver {
  @Mutation(() => Boolean)
  async changePassword(
    @Arg("changeData") changeData: ChangePasswordInput,
    @Ctx() ctx: Config["context"]
  ): Promise<boolean> {
    const [[, id], [,]] = await redis
      .pipeline()
      .get(changePasswordUserPrefix + changeData.token)
      .del(changePasswordUserPrefix + changeData.token)
      .exec();

    if (!id) {
      throw invalidTokenError();
    }

    const user = await User.findOne(id);
    if (!user) {
      throw invalidTokenError();
    }

    user.password = await argon2.hash(changeData.password, {
      type: argon2.argon2d,
    });

    await user.save();

    ctx.req.session.userId = user.id;
    ctx.req.session.userRole = user.role;

    return true;
  }
}
