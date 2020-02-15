import { Role } from "src/database/entities/role.entity";

export class RegisterDto {
  username: string;
  email: string;
  password: string;
  role: Role;
}
