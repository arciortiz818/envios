import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepository } from "../auth/auth.repository";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt-strategy";
import { PassportModule } from "@nestjs/passport";
 
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([AuthRepository]),
    JwtModule.register({
      secret: "topSecret51",
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {}
