import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity";
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";
import { UserManyDto } from "./dto/user-many.dto";
import { UserDto } from "./dto/user.dto";
import { UpdateResult } from "typeorm";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserDecorator } from "../decorators/user.decorator";
import { hasRoles } from "../decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "../enums/roles.enum";
import { SuccessDto } from "./dto/success.dto";


// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
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
      },
      'payment_method.formSelectEntity':{
        eager: true,
        alias: 'rep1',
        persist: ['id']
      },
      'project.formSelectEntity':{
        eager: true
      },
      'building_type.formSelectEntity':{
        eager: true,
        alias: 'rep16',
      },
      'rooms.formSelectEntity':{
        eager: true,
        alias: 'rep4',
      },
      'repairs.formSelectEntity':{
        eager: true,
        alias: 'rep2',
      },
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

  @Override()
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserEntity,
    @Param("id") id: number
  ): Promise<UpdateResult> {
    return this.service.updateOneBase(req, dto, id);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  //
  @ApiBearerAuth()
  @hasRoles(Role.Mida)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/resources/fetch-mida")
  findAll(
    @UserDecorator() user: any
  ) {
    return this.service.getItem(user);
  }

  @ApiBearerAuth()
  @hasRoles(Role.Mida)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/status/mida")
  success(
    @Body() dto: SuccessDto,
    @UserDecorator() user: any
  ): Promise<any> {
    return this.service.success(dto, user);
  }

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
