import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "../auth/dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getUsers():Promise<UserDto[]> {
    const data = await this.userRepository.find();
    if (!data) {
      throw new NotFoundException(`No existen usuarios`);
    }
    const usersData:UserDto[] = [];
    data.forEach(element => {
      usersData.push({
        id: element.id,
        username: element.username,
        email: element.email,
        role: element.role,  
        status: element.status      
      })
    });

    return usersData;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, email, password, role } = createUserDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.role = role;
    user.status = "ACTIVE";

    await user.save();

    return user;
  }

  async getUserById(id: number): Promise<UserDto> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Usuario con ID ${id} no se encuentra.`);
    }
    return found;
  }

  async loginUser(loginDto: LoginDto): Promise<UserDto> {
    const user = await this.validateUser(loginDto);

    if (!user) {
      return null;
    }
    return user;
  }

  private async validateUser(loginDto: LoginDto): Promise<UserDto> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ username });
    const isValidPassword = await this.validatePassword(
      password,
      user.password,
      user.salt
    );
    if (user && isValidPassword) {
      return user;
    } else {
      return null;
    }
  }

  private async validatePassword(
    reqPassword: string,
    bdPassword: string,
    bdSalt: string
  ): Promise<boolean> {
    const hash = await bcrypt.hash(reqPassword, bdSalt);     
    return bdPassword === hash;
  }
}
