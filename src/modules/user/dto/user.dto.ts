import { Role } from "src/modules/role/role.entity";


export class UserDto {
  id: number;
  username: string;
  email: string;
  role: Role;
  status: string;
}
