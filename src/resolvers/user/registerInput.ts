import { User } from "../../models/User";
import { InputType, Field } from "type-graphql";
import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNotEmpty,
} from "class-validator";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @IsString()
  @Length(3, 25)
  @Matches(/^[a-zA-Z][a-zA-Z0-9]*[_-]?[a-zA-Z0-9]*$/, {
    message:
      "username has to start with a letter and can contain numbers. words can only be seperated by - or _ once",
  })
  @IsNotEmpty()
  username: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @Length(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, {
    message:
      "password has to consist of at least one uppercase and lowercase character, one number and a special character",
  })
  @IsNotEmpty()
  password: string;
}
