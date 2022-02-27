import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";


export class UserManyDto {

  @Expose()
  @Type(() => UserDto)
  data: UserDto[];
}
