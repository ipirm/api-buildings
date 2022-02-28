import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository, UpdateResult } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudRequest } from "@nestjsx/crud";
import { FormOptionEntity } from "../option/entities/option.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    @InjectRepository(FormOptionEntity) private readonly option: Repository<FormOptionEntity>
  ) {
    super(user);
  }

  async createOneBase(req: CrudRequest, dto: UserEntity): Promise<UserEntity> {

    if (dto.rooms) {
      const rooms = await this.option.findByIds(dto.rooms.toString().split(",").map(item => parseInt(item)));
      Object.assign(dto, { rooms: [...rooms] });
    }

    if (dto.building_type) {
      const building_type = await this.option.findByIds(dto.building_type.toString().split(",").map(item => parseInt(item)));
      Object.assign(dto, { building_type: [...building_type] });
    }

    if (dto.repairs) {
      const repairs = await this.option.findByIds(dto.repairs.toString().split(",").map(item => parseInt(item)));
      Object.assign(dto, { repairs: [...repairs] });
    }

    return await this.user.save(this.user.create(dto));
  }

  async updateOneBase(req: CrudRequest, dto: UserEntity, id: number): Promise<UpdateResult> {
    if (dto.rooms) {
      const user = await this.user.findOne(id, { relations: ["rooms"] });
      const rooms = await this.option.findByIds(dto.rooms.toString().split(",").map(item => parseInt(item)));
      user.rooms = [...rooms];
      await this.user.save(user);
      delete dto.rooms;
    }

    if (dto.building_type) {
      const user = await this.user.findOne(id, { relations: ["building_type"] });
      const building_type = await this.option.findByIds(dto.building_type.toString().split(",").map(item => parseInt(item)));
      user.building_type = [...building_type];
      await this.user.save(user);
      delete dto.building_type;
    }

    if (dto.repairs) {
      const user = await this.user.findOne(id, { relations: ["repairs"] });
      const repairs = await this.option.findByIds(dto.repairs.toString().split(",").map(item => parseInt(item)));
      user.repairs = [...repairs];
      await this.user.save(user);
      delete dto.repairs;
    }

// console.log(dto);

    return await this.user.update(id, { ...dto });
    ;
  }
}
