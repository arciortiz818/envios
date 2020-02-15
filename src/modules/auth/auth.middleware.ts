import { HttpException } from "@nestjs/common/exceptions/http.exception";
import {
  NestMiddleware,
  HttpStatus,
  Injectable,
  BadRequestException,
  UnauthorizedException
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtConstants } from "./constants";
import { UserService } from "../user/user.service";
import { RouteService } from "../route/route.service";
import { getConnection } from "typeorm";
import { Route } from "src/database/entities/route.entity";
import { RouteDto } from "../route/dto/route.dto";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeaders = req.headers.authorization;

      if (authHeaders && (authHeaders as string).split(" ")[1]) {
        const token = (authHeaders as string).split(" ")[1];
        const decoded: any = jwt.verify(token, jwtConstants.secret);

        //Decodificamos el usuario
        const user = await this.userService.get(decoded.id);

        //Si no existe el usuario
        if (!user) {
          throw new HttpException("User not found.", HttpStatus.UNAUTHORIZED);
        }

        //Consultamos los roles que tienen acceso a la ruta solicitada
        const routeRepository = getConnection().getRepository("Route");
        const rolesRoute: any = await routeRepository.findOne({
          select: ["roles"],
          where: { path: req.route.path }
        });

        //Si no se logra la consulta
        if (!rolesRoute) {
          throw new BadRequestException();
        }

        //Tomamos los roles consultados
        const { roles } = rolesRoute;
        if (!roles) {
          throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
        }

        //Parseamos la cadena consultada a un array
        const rolesArray = JSON.parse(roles);

        //Buscamos en el array el role del usuario logueado
        const rta = rolesArray.find(element => {
          return element == user.role.id;
        });

        //Si la ruta no tiene este role
        if (!rta) {
          throw new UnauthorizedException();
        }

        //Asignamos el usuario a la peticion
        req.user = user;
        next();
      } else {
        throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }
  }
}
