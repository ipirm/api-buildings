import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { ElementEntity } from "../element/entities/element.entity";
import { ElementService } from "../element/element.service";
import { FormOptionEntity } from "./entities/option.entity";

@ApiTags("Option")
@Crud({
  model: {
    type: FormOptionEntity
  }
})
@Controller("api/option")
export class OptionController implements CrudController<FormOptionEntity> {
  constructor(public service: OptionService) {
  }

  // @Post()
  // create(@Body() createOptionDto: CreateOptionDto) {
  //   return this.optionService.create(createOptionDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.optionService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.optionService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
  //   return this.optionService.update(+id, updateOptionDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.optionService.remove(+id);
  // }
}
