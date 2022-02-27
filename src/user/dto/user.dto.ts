import { Exclude } from "class-transformer";

export class UserDto {

  @Exclude()
  password: string;

  @Exclude()
  salt: string;
}
