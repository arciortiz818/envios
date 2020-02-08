import { Module, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configApp from "./config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database.config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RouteModule } from "./modules/route/route.module";
import { RoleModule } from "./modules/role/role.module";
import { AuthMiddleware } from "./modules/auth/auth.middleware";
import { UserController } from "./modules/user/user.controller";
import { UserService } from "./modules/user/user.service";
import { User } from "./modules/user/user.entity";
import { AuthController } from "./modules/auth/auth.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
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
  providers: [UserService]
})
export class AppModule {
  constructor() {}

  // public configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes(UserController, AuthController);
  // }
}
