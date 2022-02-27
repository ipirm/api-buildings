import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class SaveFileDto {

  @IsOptional()
  @ApiProperty({ type: "string", format: "binary", description: "Обложка Портфолио", required: false  })
  file: string;
}
