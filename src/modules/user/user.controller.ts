import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getAll();
  }

  @Get("/:id")
  async getUserById(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
    return await this.userService.get(id);
  }

  @Post("/save")
  createUser(@Body() user: User): Promise<any> {
    return this.userService.create(user);
  }
}
