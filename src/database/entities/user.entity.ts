import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Role } from "./role.entity";

@Entity("users")
export class User extends BaseEntity {
  [x: string]: unknown;
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", default: "ACTIVE", length: 8 })
  status: string;

  @Column({ type: "varchar" })
  salt: string;

  @ManyToOne(type => Role, role => role.users)
  @JoinColumn()
  role: Role;

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
