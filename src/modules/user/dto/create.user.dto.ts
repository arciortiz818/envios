import { Role } from "src/database/entities/role.entity";

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: Role;
}
