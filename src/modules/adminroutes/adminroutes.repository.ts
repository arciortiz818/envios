import { Route } from "./route.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Route)
export class AdminRoutesRepository extends Repository<Route> {}
