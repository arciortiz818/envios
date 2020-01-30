import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";
import { AuthRepository } from "./auth.repository";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { Repository } from "typeorm";
import { Role } from "../role/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private _authRepository: AuthRepository,
    private jwtService: JwtService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, email, role } = signUpDto;

    //Validamos si existe el usuario
    const userExists = await this._authRepository.findOne({
      where: [{ username }, { email }]
    });
    if (userExists) {
      throw new ConflictException(`username or email already exists`);
    }

    //Validamos si existe el ROL
    const isRole = await this.validateExistsRole(signUpDto.role);
    if (!isRole) {
      throw new ConflictException(`El Role ${role} no existe.`);
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

  async validateExistsRole(role: string): Promise<boolean> {
    try {
      const roleData = await this.roleRepository.find({ role });
      if (roleData.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
