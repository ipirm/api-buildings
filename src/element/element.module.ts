import { Module } from "@nestjs/common";
import { ElementService } from "./element.service";
import { ElementController } from "./element.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElementEntity } from "./entities/element.entity";

@Module({
  controllers: [ElementController],
  imports: [
    TypeOrmModule.forFeature([ElementEntity])
  ],
  providers: [ElementService]
})
export class ElementModule {
}
