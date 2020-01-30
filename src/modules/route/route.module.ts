import { Module } from "@nestjs/common";
import { RouteService } from "./route.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "./route.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  providers: [RouteService]
})
export class RouteModule {}
