import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import configApp from "./config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database.config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RouteModule } from "./modules/route/route.module";
import { RoleModule } from "./modules/role/role.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./modules/auth/constants";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      load: [configApp],
      isGlobal: true
    }),
    UserModule,
    AuthModule,
    RouteModule,
    RoleModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor() {}
}
