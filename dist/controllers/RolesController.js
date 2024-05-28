"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const api_error_1 = require("../helpers/api-error");
const rolesRepository_1 = require("../repositories/rolesRepository");
class RolesController {
    async list(req, res) {
        try {
            const listRoles = await rolesRepository_1.roleRepository.find();
            return res.status(200).json(listRoles);
        }
        catch (error) {
            throw new api_error_1.ServerError('Internal Server Error');
        }
    }
    async store(req, res) {
        try {
            const { role } = req.body;
            const newRole = rolesRepository_1.roleRepository.create({ role });
            await rolesRepository_1.roleRepository.save(newRole);
            return res.status(201).json(newRole);
        }
        catch (error) {
            throw new api_error_1.ServerError('Internal Server Error');
        }
    }
}
exports.RolesController = RolesController;
