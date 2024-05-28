"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const api_error_1 = require("../helpers/api-error");
const userRepository_1 = require("../repositories/userRepository");
const adressRepository_1 = require("../repositories/adressRepository");
class UserController {
    async list(req, res) {
        try {
            // const listAdress = await adressRepository.find({
            //   relations: {
            //     user: true,
            //   },
            // });
            const listUser = await userRepository_1.userRepository.find({
                relations: {
                    addresses: true,
                    userRoles: true,
                },
            });
            const userListWithoutPassword = listUser.map((user) => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            return res.json(userListWithoutPassword);
        }
        catch (error) {
            throw new api_error_1.ServerError("Internal Server Error");
        }
    }
    async listID(req, res) {
        try {
            const { id } = req.params;
            const listUserID = await userRepository_1.userRepository.findById(Number(id), {
                relations: { addresses: true, userRoles: true },
            });
            if (!listUserID) {
                throw new api_error_1.NotFoundError("User not found");
            }
            const { password, ...userWithoutPassword } = listUserID;
            return res.json(userWithoutPassword);
        }
        catch (error) {
            if (error instanceof api_error_1.NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            throw new api_error_1.ServerError("Internal Server Error");
        }
    }
    async store(req, res) {
        try {
            const { name, email, password } = req.body;
            const newUser = userRepository_1.userRepository.create({ name, email, password });
            await userRepository_1.userRepository.beforeChange(newUser);
            await userRepository_1.userRepository.save(newUser);
            const { password: _, ...userWithPassword } = newUser;
            return res.status(201).json(userWithPassword);
        }
        catch (error) {
            throw new api_error_1.ServerError("Internal Server Error");
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const upUser = await userRepository_1.userRepository.findById(Number(id));
            if (!upUser) {
                throw new api_error_1.NotFoundError("User not found");
            }
            if (name)
                upUser.name = name;
            if (email)
                upUser.email = email;
            if (password)
                upUser.password = password;
            await userRepository_1.userRepository.beforeChange(upUser);
            await userRepository_1.userRepository.save(upUser);
            const { password: _, ...userWithPassword } = upUser;
            return res.status(201).json(userWithPassword);
        }
        catch (error) {
            if (error instanceof api_error_1.NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            throw new api_error_1.ServerError("Internal Server Error");
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            const delUser = await userRepository_1.userRepository.findById(Number(id), {
                relations: { addresses: true, userRoles: true },
            });
            if (!delUser) {
                throw new api_error_1.NotFoundError("User not found");
            }
            if (delUser.addresses) {
                await adressRepository_1.adressRepository.remove(delUser.addresses);
            }
            if (delUser.userRoles) {
                await userRepository_1.userRepository.remove(delUser.userRoles.map((role) => role.user));
            }
            await userRepository_1.userRepository.remove(delUser);
            return res.status(200).json({ message: "User deleted" });
        }
        catch (error) {
            if (error instanceof api_error_1.NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            throw new api_error_1.ServerError("Internal Server Error");
        }
    }
}
exports.UserController = UserController;
