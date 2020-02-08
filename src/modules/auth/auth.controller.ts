import { Controller, Post, Body, Req, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../auth/dto/register.dto";
import { LoginDto } from "../auth/dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/")
  getAuth() {}

  @Post("/register")
  signUp(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("/login")
  async logIn(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post("/test")
  test(@Req() req) {
    return true;
  }
}
