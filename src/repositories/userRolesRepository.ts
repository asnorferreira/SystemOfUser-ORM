import { AppDataSource } from "../data-source";
import { UserRole } from "../entities/UserRole";

export const userRoleRepository = AppDataSource.getRepository(UserRole).extend({
  async findByUserId(user_id: number) {
    return this.findOne({ where: { user_id: Number(user_id) } });
  },
  async findByRoleId(role_id: number) {
    return this.findOne({ where: { role_id: Number(role_id) } });
  },
  async findByUserIdAndRoleId(user_id: number, role_id: number) {
    return this.findOne({
      where: { user_id: Number(user_id), role_id: Number(role_id) },
    });
  },
});
