"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userRepository = data_source_1.AppDataSource.getRepository(User_1.User).extend({
    async beforeChange(user) {
        user.password = await bcrypt_1.default.hash(user.password, 10);
    },
    async findById(id, p0, r0, ur0) {
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
