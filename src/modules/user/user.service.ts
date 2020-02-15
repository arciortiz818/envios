import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../database/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAll(): Promise<UserDto[]> {
    const data = await this.userRepository.find({ relations: ["role"] });
    if (!data) {
      throw new NotFoundException(`No existen usuarios`);
    }
    return data;
  }

  async get(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id, {
      where: { status: "ACTIVE" },
      relations: ["role"]
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no se encuentra.`);
    }
    return user;
  }

  // async create(user: User): Promise<User> {
  //   const savedUser: User = await this.userRepository.save(user);
  //   return savedUser;
  // }
}
