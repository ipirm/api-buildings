import { Injectable } from "@nestjs/common";
import { AwsService } from "./aws/aws.service";
import { SuccessDto } from "./user/dto/success.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    private readonly aws: AwsService,
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>
  ) {
  }

  async uploadFile(file: Express.Multer.File, alt: string, folder: string): Promise<any> {
    return await this.aws.uploadFile(file, alt, folder);
  }


  async removeFile(name: string, folder: string): Promise<any> {
    return await this.aws.removeFile(name, folder);
  }

  async getItem(user): Promise<any> {
    return await this.user.createQueryBuilder("u")
      .where("u.id =:id", { id: user.id })
      .select([
        "u.id",
        "u.name",
        "u.from_floor",
        "u.to_floor",
        "u.start",
        "u.start_time",
        "u.position",
        "r.id",
        "r.title",
        "r.selector",
        "ro.id",
        "ro.title",
        "ro.selector",
        "p.id",
        "p.title",
        "p.selector",
        "b.id",
        "b.title",
        "b.selector",
        "po.id",
        "po.title",
        "po.selector"
      ])
      .leftJoin("u.repairs", "r")
      .leftJoin("u.rooms", "ro")
      .leftJoin("u.payment_method", "p")
      .leftJoin("u.building_type", "b")
      .leftJoin("u.project", "po")
      .getOne();
    // user.id, { relations: ["repairs","payment_method","building_type","rooms","project"] });
  }

  async success(dto: SuccessDto, user): Promise<any> {
    return await this.user.update(user.id, { ...dto });
  }
}
