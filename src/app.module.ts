import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import configApp from "./config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database.config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminRoutesModule } from "./modules/adminroutes/adminroutes.module";
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      load: [configApp],
      isGlobal: true
    }),
    UserModule,
    AuthModule,
    AdminRoutesModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor() {}
}
