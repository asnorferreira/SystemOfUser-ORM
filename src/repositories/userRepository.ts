import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export const userRepository = AppDataSource.getRepository(User).extend({
  async beforeChange(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
  },
  async findById(
    id: number,
    p0?: { relations: any } | undefined,
    r0?: { relations: any } | undefined,
    ur0?: {
      relations: { addresses: boolean; role: boolean; userRoles: boolean };
    }
  ) {
    const options = p0 && p0.relations ? p0 : undefined;
    const optionsRole = r0 && r0.relations ? r0 : undefined;
    const optionsUserRole = ur0 && ur0.relations ? ur0 : undefined;

    return this.findOne({
      where: { id: Number(id) },
      ...options,
      ...optionsRole,
      ...optionsUserRole,
    });
  },
});
