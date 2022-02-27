import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConstants } from "./jwt/constants";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { UserService } from "../user/user.service";
import { RolesGuard } from "./guards/roles.guard";
import { AwsModule } from "../aws/aws.module";
import { UserEntity } from "../user/entities/user.entity";
import { FormOptionEntity } from "../option/entities/option.entity";
import { ElementEntity } from "../element/entities/element.entity";

@Module({
    imports: [
        AwsModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "286400s" }
        }),
        TypeOrmModule.forFeature([UserEntity,FormOptionEntity,ElementEntity])],
    providers: [AuthService, JwtStrategy, UserService, RolesGuard],
    controllers: [AuthController]
})
export class AuthModule {
}
