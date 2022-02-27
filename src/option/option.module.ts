import { Module } from "@nestjs/common";
import { OptionService } from "./option.service";
import { OptionController } from "./option.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormOptionEntity } from "./entities/option.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FormOptionEntity])
  ],
  controllers: [OptionController],
  providers: [OptionService]
})
export class OptionModule {
}
