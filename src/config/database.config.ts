import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../modules/user/user.entity";
import { Route } from "../modules/route/route.entity";
import { Role } from "../modules/role/role.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "javier",
  password: "javier",
  database: "envios",
  entities: [User, Route, Role],
  synchronize: true
};
