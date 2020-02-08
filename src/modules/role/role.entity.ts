import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "varchar", default: "ACTIVE", length: 8 })
  status: string;

  @OneToMany(
    type => User,
    user => user.role,
    { cascade: true }
  )
  user: User;

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
