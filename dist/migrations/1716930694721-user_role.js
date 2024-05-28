"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole1716930694721 = void 0;
const typeorm_1 = require("typeorm");
class UserRole1716930694721 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "user_role",
            columns: [
                {
                    name: "user_id",
                    type: "int",
                },
                {
                    name: "role_id",
                    type: "int",
                },
            ],
        }));
        await queryRunner.createForeignKeys("user_role", [
            new typeorm_1.TableForeignKey({
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
            }),
            new typeorm_1.TableForeignKey({
                columnNames: ["role_id"],
                referencedTableName: "roles",
                referencedColumnNames: ["id"],
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("user_role");
    }
}
exports.UserRole1716930694721 = UserRole1716930694721;
