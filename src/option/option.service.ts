import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ElementEntity } from "../element/entities/element.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormOptionEntity } from "./entities/option.entity";

@Injectable()
export class OptionService extends TypeOrmCrudService<FormOptionEntity> {
  constructor(@InjectRepository(FormOptionEntity) private readonly option: Repository<FormOptionEntity>) {
    super(option);
  }
  // create(createOptionDto: CreateOptionDto) {
  //   return 'This action adds a new option';
  // }
  //
  // findAll() {
  //   return `This action returns all option`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} option`;
  // }
  //
  // update(id: number, updateOptionDto: UpdateOptionDto) {
  //   return `This action updates a #${id} option`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} option`;
  // }
}
