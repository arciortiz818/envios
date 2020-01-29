import { User } from "../user/user.entity";
import { Repository, EntityRepository } from "typeorm";
import { SignUpDto } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const { username, email, password } = signUpDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException(`Username already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
