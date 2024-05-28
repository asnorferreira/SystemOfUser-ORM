"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleRepository = void 0;
const data_source_1 = require("../data-source");
const UserRole_1 = require("../entities/UserRole");
exports.userRoleRepository = data_source_1.AppDataSource.getRepository(UserRole_1.UserRole).extend({
    async findByUserId(user_id) {
        return this.findOne({ where: { user_id: Number(user_id) } });
    },
    async findByRoleId(role_id) {
        return this.findOne({ where: { role_id: Number(role_id) } });
    },
    async findByUserIdAndRoleId(user_id, role_id) {
        return this.findOne({
            where: { user_id: Number(user_id), role_id: Number(role_id) },
        });
    },
});
