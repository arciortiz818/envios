import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
