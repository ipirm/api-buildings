import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ElementEntity } from "./entities/element.entity";

@Injectable()
export class ElementService extends TypeOrmCrudService<ElementEntity> {
  constructor(@InjectRepository(ElementEntity) private readonly element: Repository<ElementEntity>) {
    super(element);
  }

  // create(createElementDto: CreateElementDto) {
  //   return 'This action adds a new element';
  // }
  //
  // findAll() {
  //   return `This action returns all element`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} element`;
  // }
  //
  // update(id: number, updateElementDto: UpdateElementDto) {
  //   return `This action updates a #${id} element`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} element`;
  // }
}
