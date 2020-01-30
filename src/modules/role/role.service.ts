import { Injectable } from "@nestjs/common";
import { Role } from "./role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleDto } from "./dto/role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>
  ) {}

  async getRoles(): Promise<RoleDto[]> {
    const roles: RoleDto[] = await this._roleRepository.find();
    return roles;
  }

  async getRoleByCodigo(role: string): Promise<Role> {
    return await this._roleRepository.findOne({ role });
  }

  async saveRole(roleDto: CreateRoleDto): Promise<Role> {
    const { role, name, description } = roleDto;
    const newRole = new Role();

    newRole.role = role;
    newRole.name = name;
    newRole.description = description;

    return await newRole.save();
  }
}
