import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { SuccessDto } from "./user/dto/success.dto";
import { UserDecorator } from "./decorators/user.decorator";
import { hasRoles } from "./decorators/roles.decorator";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RolesGuard } from "./auth/guards/roles.guard";
import { Role } from "./enums/roles.enum";

@ApiTags("Default")
@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "alt",
    required: true,
    type: String,
    example: "Image",
    description: "Alt file"
  })
  @ApiParam({
    name: "folder",
    required: true,
    type: String,
    example: "portfolio",
    description: "File folder"
  })
  @ApiOperation({ summary: "Upload file to server" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
  })
  @ApiConsumes("multipart/form-data")
  @Post("upload/:alt/:folder")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param("alt") alt: string,
    @Param("folder") folder: string
  ) {
    return this.appService.uploadFile(file, alt, folder);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "name",
    required: true,
    type: String,
    example: "Name",
    description: "File Name"
  })
  @ApiParam({
    name: "folder",
    required: true,
    type: String,
    example: "portfolio",
    description: "File folder"
  })
  @ApiOperation({ summary: "Remove file from server" })
  @Delete("remove/:name/:folder")
  removeFile(
    @Param("name") name: string,
    @Param("folder") folder: string
  ) {
    return this.appService.removeFile(name, folder);
  }


  @ApiBearerAuth()
  @hasRoles(Role.Mida)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("user/resources/fetch-mida")
  findAll(
    @UserDecorator() user: any
  ) {
    return this.appService.getItem(user);
  }

  @ApiBearerAuth()
  @hasRoles(Role.Mida)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("user/status/mida")
  success(
    @Body() dto: SuccessDto,
    @UserDecorator() user: any
  ): Promise<any> {
    return this.appService.success(dto, user);
  }

}
