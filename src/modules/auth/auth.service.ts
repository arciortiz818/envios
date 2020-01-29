import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";
import { AuthRepository } from "./auth.repository";
import { User } from "../user/user.entity";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private _authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, email } = signUpDto;
    const userExists = await this._authRepository.findOne({
      where: [{ username }, { email }]
    });

    if (userExists) {
      throw new ConflictException(`username or email already exists`);
    }

    return await this._authRepository.signUp(signUpDto);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const username = await this._authRepository.validateUserPassword(loginDto);

    if (!username) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
