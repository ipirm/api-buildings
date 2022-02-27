import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity";
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";
import { UserManyDto } from "./dto/user-many.dto";
import { UserDto } from "./dto/user.dto";

@ApiTags("User")
@Crud({
  model: {
    type: UserEntity
  },
  serialize: {
    getMany: UserManyDto,
    get: UserDto
  },
  query: {
    join: {
      payment_method: {
        eager: true
      },
      project: {
        eager: true
      },
      building_type: {
        eager: true
      },
      rooms:{
        eager: true
      },
      repairs: {
        eager: true
      }
    }
  }
})
@Controller("api/user")
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserEntity
  ): Promise<UserEntity> {
    return this.service.createOneBase(req, dto);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
