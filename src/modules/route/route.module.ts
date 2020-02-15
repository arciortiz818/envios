import { Module } from "@nestjs/common";
import { RouteService } from "./route.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "../../database/entities/route.entity";
import { RouteController } from "./route.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  controllers: [RouteController],
  providers: [RouteService]
})
export class RouteModule {}
