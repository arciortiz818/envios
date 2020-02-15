import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { RouteService } from "./modules/route/route.service";
import { UserService } from "./modules/user/user.service";
const expressListRoutes = require("../express-list-routes");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get("PORT"));

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const adminRoutesService = app.get<RouteService>(RouteService);
  adminRoutesService.insertRoutes(expressListRoutes(router));
}
bootstrap();
