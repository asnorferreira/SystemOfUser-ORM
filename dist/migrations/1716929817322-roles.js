"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles1716929817322 = void 0;
const typeorm_1 = require("typeorm");
class Roles1716929817322 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "roles",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "role",
                    type: "text",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("roles");
    }
}
exports.Roles1716929817322 = Roles1716929817322;
