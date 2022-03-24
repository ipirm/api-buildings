import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../database/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Max, Min } from "class-validator";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";
import { Role } from "../../enums/roles.enum";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import * as bcrypt from "bcrypt";
import { FormOptionEntity } from "../../option/entities/option.entity";
import { StartTypeEnum } from "../../enums/startType.enum";

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

  @ApiProperty({ example: 1, description: "Select ( Mərtəbə seçimi ) from_floor (min 0,max 9)", required: false })
  @Min(0)
  @Max(9)
  @Column("integer", { default: 0, nullable: true })
  from_floor: number;

  @ApiProperty({ example: 8, description: "Select ( Mərtəbə seçimi ) to_floor (min 0,max 9)", required: false })
  @Min(0)
  @Max(12)
  @Column("integer", { default: 0, nullable: true })
  to_floor: number;

  @ApiProperty({ example: [10, 11], description: "Otaq sayı", required: true })
  @IsOptional()
  @ManyToMany(() => FormOptionEntity, p => p.customerRoomsEntities)
  rooms: FormOptionEntity[];

  @ApiProperty({ example: [14, 15], description: "Təmir növü", required: true })
  @IsOptional()
  @ManyToMany(() => FormOptionEntity, p => p.customerRepairEntities)
  repairs: FormOptionEntity[];

  @Column({ default: null })
  screen: string;

  @Column({ default: false })
  success: boolean;

  @IsEnum(StartTypeEnum)
  @ApiModelProperty({
    enum: Object.keys(StartTypeEnum),
    default: StartTypeEnum.Timer
  })
  @Column("enum", { enum: StartTypeEnum, default: StartTypeEnum.Timer })
  @IsOptional()
  start: StartTypeEnum;

  @ApiProperty({ example: "24:00:00", description: "Time", required: true })
  @IsOptional()
  @Column("time", { name: "start_time", nullable: true })
  start_time: Date;

  @ApiProperty({ example: 8, description: "Speed Result", required: false })
  @Min(1)
  @Max(25)
  @Column("integer", { default: 0, nullable: true })
  speed: number;

  @ApiProperty({ example: 8, description: "Speed Result", required: false })
  @IsOptional()
  @Column("integer", { default: 0, nullable: true })
  position: number;

  @ManyToOne(() => UserEntity, user => user.users, { onDelete: "CASCADE" })
  @ApiProperty({ example: 13, description: "User Created By", required: false })
  @IsOptional()
  created_by: UserEntity;

  @OneToMany(() => UserEntity, photo => photo.created_by)
  @IsOptional()
  users: UserEntity[];

  @Column({default: false})
  online: boolean;
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImNyZWF0ZWRBdCI6IjIwMjItMDMtMTlUMTM6MjU6MDcuMjM2WiIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMTlUMTM6MjU6MDcuMjM2WiIsIm5hbWUiOiJTYXNoYSIsImVtYWlsIjoibmFkaXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkdS5YeTR2aVJsbERVcnovOFhYc0hnLmhaZi5LWk1meldTRkZmb1RlZTdTYkV4b0VyM1RLRU8iLCJyb2xlIjoiYWRtaW4iLCJzYWx0Ijo4LCJmcm9tX2Zsb29yIjoxLCJ0b19mbG9vciI6OCwic2NyZWVuIjpudWxsLCJzdWNjZXNzIjpmYWxzZSwic3RhcnQiOiJ0aW1lciIsInN0YXJ0X3RpbWUiOm51bGwsImlhdCI6MTY0Nzg2MzczNCwiZXhwIjoxNjQ3OTUwMTM0fQ.DzpdnLjf7NT9zJ8LSCzFP4knAUBQ8_bVQTqzS3Vijik
