import { User } from "../../models/User";
import { InputType, Field } from "type-graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class ForgotPasswordInput implements Partial<User> {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
