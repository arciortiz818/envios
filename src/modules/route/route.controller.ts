import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  InternalServerErrorException,
  Patch,
  ParseIntPipe,
  Put,
  HttpException,
  BadRequestException
} from "@nestjs/common";
import { Route } from "../../database/entities/route.entity";
import { RouteService } from "./route.service";
import { getConnection } from "typeorm";

@Controller("route")
export class RouteController {
  constructor(private readonly _routeService: RouteService) {}

  @Get("")
  async getAll(): Promise<Route[]> {
    return await this._routeService.getAll();
  }

  @Get(":id")
  async getRoute(@Param("id", ParseIntPipe) id: number): Promise<Route> {
    const route = await this._routeService.getRoute(id);
    const roles = JSON.parse(route.roles);
    return route;
  }

  @Patch(":id")
  async updateRoute(
    @Param("id", ParseIntPipe) idRoute: number,
    @Body() body
  ): Promise<boolean> {
    await this._routeService.setRole(idRoute, body.idroles);
    return true;
  }

  @Post("")
  async addRole(@Body() route: Route): Promise<Route> {
    throw new BadRequestException();
  }
}
