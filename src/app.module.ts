import { CrudConfigService } from "@nestjsx/crud";
CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000
  },
  routes: {
    only: ["getOneBase", "updateOneBase", "getManyBase", "createOneBase", "deleteOneBase"]
  }
});

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ElementModule } from './element/element.module';
import { OptionModule } from './option/option.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AwsService } from "./aws/aws.service";

@Module({
  imports: [UserModule, ElementModule, OptionModule,AuthModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        logging: false
      })
    }),
  ],
  controllers: [AppController],

  providers: [AppService, AwsService],
})
export class AppModule {}
