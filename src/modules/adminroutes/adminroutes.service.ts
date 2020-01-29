import { Injectable } from "@nestjs/common";
import { AdminRoutesRepository } from "./adminroutes.repository";
import { Route } from "./route.entity";
import { DeleteResult } from "typeorm";

@Injectable()
export class AdminRoutesService {
  constructor(private readonly _adminRoutesRepository: AdminRoutesRepository) {}

  async insertRoutes(routes) {
    await this.deleteRoutes();
    routes.forEach(element => {
      const newRoute = new Route();
      newRoute.method = element.method;
      newRoute.controller = element.controller;
      newRoute.path = element.path;
      newRoute.save();
    });
  }

  private async deleteRoutes(): Promise<DeleteResult> {
    return await this._adminRoutesRepository.delete({});
  }
}
