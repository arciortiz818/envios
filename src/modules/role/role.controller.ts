import { Controller, Get } from "@nestjs/common";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get("/")
  async getAllRoles(): Promise<Role[]> {
    return await this._roleService.getRoles();
  }
}
