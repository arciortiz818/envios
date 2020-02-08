import { Role } from "src/modules/role/role.entity";

export class RegisterDto {
  username: string;
  email: string;
  password: string;
  role: Role;
}
