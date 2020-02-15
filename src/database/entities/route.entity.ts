import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "./role.entity";

@Entity("routes")
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", nullable: false })
  path: string;

  @Column({ type: "varchar", nullable: false })
  roles: string;

  @Column({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP"
  })
  updatedAt: Date;
}
