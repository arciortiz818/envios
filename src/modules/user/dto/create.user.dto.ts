import { Role } from "src/modules/role/role.entity";

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: Role;
}
