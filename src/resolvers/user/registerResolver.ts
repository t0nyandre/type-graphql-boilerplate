import { Resolver, Mutation, Arg } from "type-graphql";
import * as cuid from "cuid";

import { User } from "../../models/User";
import { RegisterInput } from "./registerInput";
import { redis, confirmUserPrefix } from "../../../config/redis";
import { transporter } from "../../../config/nodemailer";
import { verifyAccountMail } from "../../utils/mails";

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("registerData") registerData: RegisterInput
  ): Promise<User> {
    let user: User;

    try {
      user = await User.create(registerData).save();
    } catch (error) {
      return error;
    }

    const token = cuid();
    redis.set(confirmUserPrefix + token, user.id, "EX", 60 * 60 * 24 * 2); // 2 days

    transporter.sendMail(verifyAccountMail(user, token));
    // console.log(token); // log token while not live

    return user;
  }
}
