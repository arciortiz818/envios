import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../database/entities/user.entity";
import { Route } from "../database/entities/route.entity";
import { Role } from "../database/entities/role.entity";

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
