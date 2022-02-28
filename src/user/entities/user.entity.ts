import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../database/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Max, Min } from "class-validator";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";
import { ImageInterface } from "../../interfaces/image.inteface";
import { Role } from "../../enums/roles.enum";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import * as bcrypt from "bcrypt";
import { RoomCountEnum } from "../../enums/roomCount.enum";
import { RepairTypeEnum } from "../../enums/repairType.enum";
import { BuildingTypeEnum } from "../../enums/buildingType.enum";
import { FormOptionEntity } from "../../option/entities/option.entity";

@Entity("mida_users")
export class UserEntity extends BaseEntity {

  @ApiProperty({ example: "Sasha", description: "Name", required: true })
  @IsString()
  @Column()
  @IsOptional()
  name: string;

  @ApiProperty({ example: "sasha++22@gmail.com", description: "Email", required: true })
  @IsEmail()
  @IsUniq()
  @IsOptional()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: "152", description: "Password", required: true })
  @IsString()
  @IsOptional()
  @Column()
  password: string;

  @IsEnum(Role)
  @ApiModelProperty({
    enum: Object.keys(Role),
    default: Role.User
  })
  @Column("enum", { enum: Role, default: Role.User })
  @IsOptional()
  role: Role;

  @Column({ type: "integer", default: Math.floor(Math.random() * 10) })
  salt: number;


  @BeforeInsert()
  async generatePasswordHash(): Promise<void> {
    this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(this.salt));
  }

  @BeforeUpdate()
  async generatePasswordHashUpdate(): Promise<void> {
    if (this.password !== this.password)
    this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(this.salt));
  }

  @ApiProperty({ example: 1, description: "Odenis usulu", required: false })
  @IsOptional()
  @ManyToOne(() => FormOptionEntity, user => user.customerEntities)
  payment_method: FormOptionEntity;

  @ApiProperty({ example: 3, description: "Layihe", required: false })
  @IsOptional()
  @ManyToOne(() => FormOptionEntity, user => user.projectCustomerEntities)
  project: FormOptionEntity;

  @ApiProperty({ example: [8, 9], description: "Bina tipi", required: true })
  @IsOptional()
  @ManyToMany(() => FormOptionEntity, p => p.customerBuildingTypes)
  building_type: FormOptionEntity[];

  @ApiProperty({ example: 1, description: "Select ( Mərtəbə seçimi ) from_floor (min 1,max 9)", required: false })
  @Min(1)
  @Max(9)
  @Column("integer", { default: 1 })
  from_floor: number;

  @ApiProperty({ example: 8, description: "Select ( Mərtəbə seçimi ) to_floor (min 1,max 9)", required: false })
  @Min(1)
  @Max(12)
  @Column("integer", { default: 1 })
  to_floor: number;

  @ApiProperty({ example: [10, 11], description: "Otaq sayı", required: true })
  @IsOptional()
  @ManyToMany(() => FormOptionEntity, p => p.customerRoomsEntities)
  rooms: FormOptionEntity[];

  @ApiProperty({ example: [14, 15], description: "Təmir növü", required: true })
  @IsOptional()
  @ManyToMany(() => FormOptionEntity, p => p.customerRepairEntities)
  repairs: FormOptionEntity[];

}
