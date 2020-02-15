import { Role } from "src/database/entities/role.entity";

export class UserDto {
  id: number;
  username: string;
  email: string;
  role: Role;
  status: string;
}
