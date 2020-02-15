import { Injectable } from "@nestjs/common";
import { Route } from "../../database/entities/route.entity";
import { DeleteResult, Repository, getConnection } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly _adminRoutesRepository: Repository<Route>
  ) {}

  async getAll(): Promise<Route[]> {
    const routes = await this._adminRoutesRepository.find();
    return routes;
  }

  async getRoute(idRoute: number): Promise<Route> {
    const route = await this._adminRoutesRepository.findOne({ id: idRoute });
    return route;
  }

  async getRouteByPath(path: string): Promise<Route> {
    const route = await this._adminRoutesRepository.findOne({ path: path });
    return route;
  }

  async insertRoutes(routes) {
    const existRoute = await this._adminRoutesRepository.find();
    if (existRoute) {
      //this.deleteRoutes();
      routes.forEach(async element => {
        if (!existRoute || existRoute.length == 0) {
          try {
            const newRoute = new Route();
            newRoute.path = element.path;
            //const role = await this.getRoleData(1);
            newRoute.roles = "[1]";
            newRoute.save();
            console.log(`Ruta nueva insertada: ${element.path}`);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  }

  async setRole(idRoute: number, idRoles: number[]) {
    const route = await this.getRoute(idRoute);
    if (route) {
      route.roles = JSON.stringify(idRoles);
      await this._adminRoutesRepository.save(route);
    }
  }

  private async deleteRoutes(): Promise<DeleteResult> {
    return await this._adminRoutesRepository.delete({});
  }
}
