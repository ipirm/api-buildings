import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class SuccessDto {

  @ApiProperty({ example: "image url", description: "Name", required: true })
  @IsString()
  @IsOptional()
  screen: string;

  @ApiProperty({ example: true, description: "Status", required: true })
  @IsBoolean()
  @IsOptional()
  success: boolean;

  @ApiProperty({ example: "Speed in seconds", description: "speed", required: true })
  @IsOptional()
  speed: number;
}
