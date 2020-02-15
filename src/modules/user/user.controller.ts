import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getAll();
  }

  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
    return await this.userService.get(id);
  }

  // @Post("")
  // async createUser(@Body() user: User): Promise<any> {
  //   return await this.userService.create(user);
  // }
}
