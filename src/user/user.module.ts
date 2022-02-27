import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { FormOptionEntity } from "../option/entities/option.entity";
import { ElementEntity } from "../element/entities/element.entity";

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntity,FormOptionEntity,ElementEntity]),
  ],
  providers: [UserService]
})
export class UserModule {}
