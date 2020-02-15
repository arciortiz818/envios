import { Injectable } from "@nestjs/common";
import { Role } from "../../database/entities/role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>
  ) {}

  async getRoles(): Promise<Role[]> {
    const roles: Role[] = await this._roleRepository.find();
    return roles;
  }

  async getRole(id: number): Promise<Role> {
    const role = await this._roleRepository.findOne(id);
    return role;
  }

  async saveRole(role: Role): Promise<Role> {
    const { name, description } = role;
    const newRole = new Role();

    newRole.name = name;
    newRole.description = description;

    return await newRole.save();
  }
}
