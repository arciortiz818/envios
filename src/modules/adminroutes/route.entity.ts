import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("routes")
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", nullable: false })
  method: string;

  @Column({ type: "varchar", nullable: false })
  controller: string;

  @Column({ type: "varchar", nullable: false })
  path: string;
  
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
