import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  getUsers() {
    const found = this.userRepository.find();
    if (!found) {
      throw new NotFoundException(`No existen usuarios`);
    }
    return found;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.status = "ACTIVE";

    await user.save();

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Usuario con ID ${id} no se encuentra.`);
    }
    return found;
  }
}
