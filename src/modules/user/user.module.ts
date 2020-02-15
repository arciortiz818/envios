import { Module, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "../../database/entities/user.entity";
import { AuthMiddleware } from "../auth/auth.middleware";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: []
})
export class UserModule {}
