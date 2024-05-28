import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Role } from "./Role";
import { UserRole } from "./UserRole";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  // @OneToOne(() => Address, (adress) => adress.user)
  @OneToMany(() => Address, (adress) => adress.user)
  // address: Address;
  addresses: Address[];

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
