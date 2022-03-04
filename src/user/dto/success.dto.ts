import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class SuccessDto {

  @ApiProperty({ example: "image url", description: "Name", required: true })
  @IsString()
  @Column()
  @IsOptional()
  screen: string;

  @ApiProperty({ example: true, description: "Status", required: true })
  @IsBoolean()
  @Column()
  @IsOptional()
  success: boolean;

}
