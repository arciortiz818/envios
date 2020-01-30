import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  InternalServerErrorException
} from "@nestjs/common";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";
import { RoleDto } from "./dto/role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller("role")
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get("/")
  async getAllRoles(): Promise<RoleDto[]> {
    return await this._roleService.getRoles();
  }

  @Get("/:role")
  async getRoleByCodigo(@Param("role") role: string): Promise<Role> {
    return await this._roleService.getRoleByCodigo(role);
  }

  @Post("/save")
  async addRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = await this._roleService.saveRole(createRoleDto);
    if (!newRole) {
      throw new InternalServerErrorException();
    }
    return newRole;
  }
}
