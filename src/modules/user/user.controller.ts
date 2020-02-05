import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @Get("/:id")
  async getUserById(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Post("/save")
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }
}
