import { Module } from "@nestjs/common";
import { AdminRoutesService } from "./adminroutes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminRoutesRepository } from "./adminroutes.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AdminRoutesRepository])],
  providers: [AdminRoutesService]
})
export class AdminRoutesModule {}
