import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: "user_role",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  users: User[];
}
