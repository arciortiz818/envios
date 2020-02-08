import {
  Injectable,
  ConflictException,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import { AuthRepository } from "./auth.repository";
import * as bcrypt from "bcrypt";
import { RoleType } from "../role/roletype.enum";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterDto> {
    const { username, email } = registerDto;

    //Validamos si existe el usuario
    const userExists = await this._authRepository.findOne({
      where: [{ username }, { email }]
    });

    if (userExists) {
      throw new ConflictException(`username o email already exists`);
    }

    return await this._authRepository.registerUser(registerDto);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user: User = await this._authRepository.findOne({
      where: { username }
    });

    if (!user) {
      throw new UnauthorizedException(`User does not exists`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role.name
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
