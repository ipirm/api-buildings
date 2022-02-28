import { Controller, UseGuards } from "@nestjs/common";
import { ElementService } from "./element.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { ElementEntity } from "./entities/element.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("Element")
@Crud({
  model: {
    type: ElementEntity
  },
  query: {
    join: {
      formOptionEntities: {
        eager: true
      }
    }
  }
})
@Controller("api/element")
export class ElementController implements CrudController<ElementEntity> {
  constructor(public service: ElementService) {
  }

  // @Post()
  // create(@Body() createElementDto: CreateElementDto) {
  //   return this.elementService.create(createElementDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.elementService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.elementService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
  //   return this.elementService.update(+id, updateElementDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.elementService.remove(+id);
  // }
}
