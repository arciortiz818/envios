import { Injectable } from "@nestjs/common";
import { Route } from "./route.entity";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly _adminRoutesRepository: Repository<Route>
  ) {}

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
