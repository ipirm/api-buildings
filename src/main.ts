import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import helmet from "helmet";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger("NestFactory");

  const options = new DocumentBuilder()
    .setTitle("Tviser Agency REST API")
    .setDescription("The API service of Tviser Agency")
    .setVersion("1.0")
    .addBearerAuth()
    .setContact("Tviser Agency Support", "mailto:hello@tviser.agency", "hello@tviser.agency")
    .build();

  const document = SwaggerModule.createDocument(app, options,{
    // extraModels: [ExtraModel],
  });

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    skipMissingProperties: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.use(helmet());
  app.enableCors({
    // origin: ["https://building-admin.tviser.agency"]
  });


  // app.enableCors()

  // SwaggerModule.setup("api", app, document);

  await app.listen(parseInt(process.env.PORT)).then(() => logger.log(`App running on ${process.env.PORT} port`));
}

bootstrap();
