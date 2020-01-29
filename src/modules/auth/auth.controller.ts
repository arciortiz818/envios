import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("/login")
  signIn(@Body() signInDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(signInDto);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() req) {
    return { hola: "hola" };
  }
}
