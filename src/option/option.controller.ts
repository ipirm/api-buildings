import { Controller, UseGuards } from "@nestjs/common";
import { OptionService } from "./option.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { FormOptionEntity } from "./entities/option.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";


// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiTags("Option")
@Crud({
  model: {
    type: FormOptionEntity
  },
  query: {
    join: {
      formSelectEntity: {
        eager: true
      }
    }
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
