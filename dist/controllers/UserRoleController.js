"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleController = void 0;
const api_error_1 = require("../helpers/api-error");
const userRolesRepository_1 = require("../repositories/userRolesRepository");
class UserRoleController {
    async store(req, res) {
        try {
            const { user_id, role_id } = req.body;
            const newUserRole = userRolesRepository_1.userRoleRepository.create({ user_id, role_id });
            await userRolesRepository_1.userRoleRepository.save(newUserRole);
            return res.status(201).json(newUserRole);
        }
        catch (error) {
            console.error("Error in UserRoleController.store:", error);
            throw new api_error_1.ServerError("Internal Server Error");
        }
    }
}
exports.UserRoleController = UserRoleController;
