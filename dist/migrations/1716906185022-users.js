"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1716906185022 = void 0;
const typeorm_1 = require("typeorm");
class Users1716906185022 {
    async up(queryRunner) {
        const table = new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.Users1716906185022 = Users1716906185022;
