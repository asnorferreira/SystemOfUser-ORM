import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity('user_role')
export class UserRole {
    @PrimaryColumn({ name: "user_id" })
    user_id: number;

    @PrimaryColumn({ name: "role_id" })
    role_id: number;

    @ManyToOne(() => User, user => user.roles)
    @JoinColumn({ name: "user_id"})
    user: User;
    
    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: "role_id"})
    role: Role;
}