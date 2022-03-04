import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Default")
@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
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
}
