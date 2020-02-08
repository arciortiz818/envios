import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtConstants } from "./constants";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.route.path);
    try {
      const authHeaders = req.headers.authorization;

      if (authHeaders && (authHeaders as string).split(" ")[1]) {
        const token = (authHeaders as string).split(" ")[1];
        const decoded: any = jwt.verify(token, jwtConstants.secret);
        const user = await this.userService.get(decoded.id);

        if (!user) {
          throw new HttpException("User not found.", HttpStatus.UNAUTHORIZED);
        }

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
