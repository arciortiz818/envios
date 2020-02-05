import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post("/signup")
  // signUp(@Body() signUpDto: SignUpDto) {
  //   return this.authService.signUp(signUpDto);
  // }

  @Post("/login")
  async logIn(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post("/test")
  test(@Req() req) {
    return true;
  }
}
