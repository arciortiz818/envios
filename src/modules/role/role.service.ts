import { Injectable } from "@nestjs/common";
import { RoleRepository } from "./role.repository";
import { Role } from "./role.entity";

@Injectable()
export class RoleService {
  constructor(private readonly _roleRepository: RoleRepository) {}

  async getRoles(): Promise<Role[]> {
    const rta = await this._roleRepository.find();
    return rta;
  }
}
