import { Resolver, Ctx, Mutation, Arg } from "type-graphql";
import * as argon2 from "argon2";
import { Config } from "apollo-server-express";

import { User } from "../../models/User";
import {
  accountNotVerifiedError,
  invalidLoginError,
} from "../../utils/errorMessages";
import { LoginInput } from "./loginInput";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg("loginData") loginData: LoginInput,
    @Ctx() ctx: Config["context"]
  ): Promise<User> {
    const user = await User.findOne({ email: loginData.email });

    if (!user) {
      throw invalidLoginError();
    }

    const valid = await argon2.verify(user.password, loginData.password);
    if (!valid) {
      throw invalidLoginError();
    }

    if (!user.confirmed) {
      throw accountNotVerifiedError();
    }

    ctx.req.session.userId = user.id;
    ctx.req.session.userRole = user.role;

    return user;
  }
}
