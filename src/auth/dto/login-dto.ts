import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: "sasha@gmail.com", description: "email" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "152", description: "passsword" })
    password: string;

}
