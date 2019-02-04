import { Resolver, Query, Arg } from "type-graphql";
import * as cuid from "cuid";

import { User } from "../../models/User";
import { redis, changePasswordUserPrefix } from "../../../config/redis";
import { ForgotPasswordInput } from "./forgotPasswordInput";
import { forgotPasswordMail } from "../../utils/mails";
import { transporter } from "../../../config/nodemailer";

@Resolver(User)
export class ForgotPasswordResolver {
  @Query(() => Boolean)
  async forgotPassword(
    @Arg("forgotData") forgotData: ForgotPasswordInput
  ): Promise<boolean> {
    const user = await User.findOne({ email: forgotData.email });

    if (!user) {
      return true;
    }

    const token = cuid();
    redis.set(
      changePasswordUserPrefix + token,
      user.id,
      "EX",
      60 * 60 * 24 * 1
    ); // 1 day

    transporter.sendMail(forgotPasswordMail(user, token));
    // console.log(token); // console log token while in dev

    return true;
  }
}
