import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../database/entities/base.entity";
import { FormOptionEntity } from "../../option/entities/option.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


@Entity("mida_elements")
export class ElementEntity extends BaseEntity {

  @ApiProperty({ example: "Ödəniş üsulu", description: "title", required: true })
  @IsString()
  @IsOptional()
  @Column({ type: "varchar", length: 500, nullable: true })
  title: string;

  @OneToMany(() => FormOptionEntity, photo => photo.formSelectEntity)
  formOptionEntities: FormOptionEntity[];

}
