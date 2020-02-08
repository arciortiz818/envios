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
    routes.forEach(async element => {
      const existRoute = await this._adminRoutesRepository.find({
        where: { path: element.path }
      });
      if (!existRoute || existRoute.length == 0) {
        const newRoute = new Route();
        newRoute.path = element.path;
        newRoute.save();
        console.log(`Ruta nueva insertada: ${element.path}`);
      }
    });
  }

  // private async deleteRoutes(): Promise<DeleteResult> {
  //   return await this._adminRoutesRepository.delete({});
  // }
}
