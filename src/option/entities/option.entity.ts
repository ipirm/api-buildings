import { BaseEntity } from "../../database/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { UserEntity } from "../../user/entities/user.entity";
import { ElementEntity } from "../../element/entities/element.entity";

@Entity("mida_options")
export class FormOptionEntity extends BaseEntity {

  @ApiProperty({ example: "Ödəniş üsulu", description: "title", required: true })
  @IsString()
  @IsOptional()
  @Column({ type: "varchar", length: 500, nullable: true })
  title: string;

  @ApiProperty({ example: "a[href^=\"https\"]", description: "selector", required: true })
  @IsString()
  @IsOptional()
  @Column({ type: "varchar", length: 500, nullable: true })
  selector: string;

  @ApiProperty({ example: 1, description: "formSelectEntity", required: true })
  @IsOptional()
  @ManyToOne(() => ElementEntity, f => f.formOptionEntities, { eager: true, onDelete: "CASCADE" })
  formSelectEntity: ElementEntity;

  @OneToMany(() => UserEntity, c => c.payment_method)
  customerEntities: UserEntity[];

  @OneToMany(() => UserEntity, c => c.project)
  projectCustomerEntities: UserEntity[];

  @ManyToMany(() => UserEntity, h => h.rooms,{ onDelete: "CASCADE" })
  @JoinTable()
  customerRoomsEntities: UserEntity[];

  @ManyToMany(() => UserEntity, h => h.building_type)
  @JoinTable()
  customerBuildingTypes: UserEntity[]

  @ManyToMany(() => UserEntity, h => h.repairs)
  @JoinTable()
  customerRepairEntities:UserEntity[]
}
