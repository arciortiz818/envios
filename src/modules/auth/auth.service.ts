import {
  Injectable,
  ConflictException,
  UnauthorizedException
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  // async signUp(signUpDto: SignUpDto): Promise<User> {
  //   const { username, email, role } = signUpDto;

  //   //Validamos si existe el usuario
  //   const userExists = await this._authRepository.findOne({
  //     where: [{ username }, { email }]
  //   });
  //   if (userExists) {
  //     throw new ConflictException(`username or email already exists`);
  //   }

  //   //Validamos si existe el ROL
  //   const isRole = await this.validateExistsRole(signUpDto.role);
  //   if (!isRole) {
  //     throw new ConflictException(`El Role ${role} no existe.`);
  //   }

  //   return null; //await this._authRepository.signUp(signUpDto);
  // }

  // async validateExistsRole(role: string): Promise<boolean> {
  //   try {
  //     const roleData = await this.roleRepository.find({ role });
  //     if (roleData.length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.loginUser(loginDto);

    if (!user) {
      throw new UnauthorizedException(`Credenciales incorrectas`);
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const accessToken = await this.jwtService.sign(payload);
    return {
      userId: user.id,
      username: user.username,
      role: user.role,
      token: accessToken
    };
  }
}
