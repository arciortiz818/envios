import { EntityRepository, Repository, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import * as bcrypt from "bcrypt";
import { Role } from "../role/role.entity";
import { RoleType } from "../role/roletype.enum";
import { RegisterDto } from "./dto/register.dto";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async registerUser(registerDto: RegisterDto) {
    const { username, email, password, role } = registerDto;

    const salt = 10;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, salt);

    const roleRepository = await getConnection().getRepository(Role);
    let defaultRole: Role;
    if (role) {
      defaultRole = await roleRepository.findOne({
        where: { name: role.name }
      });
    } else {
      defaultRole = await roleRepository.findOne({
        where: { name: RoleType.USER }
      });
    }

    user.role = defaultRole;

    user.status = "ACTIVE";

    return await user.save();
  }
}
