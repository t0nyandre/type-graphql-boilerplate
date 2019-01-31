import { InputType, Field } from "type-graphql";
import { IsString, Length, Matches, IsNotEmpty } from "class-validator";

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @Length(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, {
    message:
      "password has to consist of at least one uppercase and lowercase character, one number and a special character",
  })
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  token: string;
}
