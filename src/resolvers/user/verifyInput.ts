import { InputType, Field } from "type-graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class VerifyInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  token: string;
}
