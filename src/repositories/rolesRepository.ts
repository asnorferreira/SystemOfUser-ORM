import { AppDataSource } from "../data-source";
import { Role } from "../entities/Role";

export const roleRepository = AppDataSource.getRepository(Role).extend({
    async findByRole(role: string) {
        return this.findOne({ where: { role: String(role) } });
    },
})
