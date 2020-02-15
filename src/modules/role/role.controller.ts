import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  InternalServerErrorException
} from "@nestjs/common";
import { Role } from "../../database/entities/role.entity";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get("")
  async getAllRoles(): Promise<Role[]> {
    return await this._roleService.getRoles();
  }

  @Get("/:id")
  async getRole(@Param("id") id: number): Promise<Role> {
    return await this._roleService.getRole(id);
  }

  @Post("")
  async addRole(@Body() role: Role): Promise<Role> {
    const newRole = await this._roleService.saveRole(role);
    if (!newRole) {
      throw new InternalServerErrorException();
    }
    return newRole;
  }
}
