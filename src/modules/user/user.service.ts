import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository, getConnection } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAll(): Promise<UserDto[]> {
    const data = await this.userRepository.find();
    if (!data) {
      throw new NotFoundException(`No existen usuarios`);
    }
    const usersData: UserDto[] = [];
    data.forEach(element => {
      usersData.push({
        id: element.id,
        username: element.username,
        email: element.email,
        role: element.role,
        status: element.status
      });
    });

    return usersData;
  }

  async get(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id, {
      where: { status: "ACTIVE" }
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no se encuentra.`);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    //const repo = await getConnection().getRepository(Role);
    const savedUser: User = await this.userRepository.save(user);
    return savedUser;
  }
}
