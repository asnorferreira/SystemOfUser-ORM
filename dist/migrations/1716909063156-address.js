"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address1716909063156 = void 0;
const typeorm_1 = require("typeorm");
class Address1716909063156 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "addresses",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "zipcode",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "street",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "number",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "complement",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "city",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "state",
                    type: "varchar",
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createForeignKey("addresses", new typeorm_1.TableForeignKey({
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("addresses");
    }
}
exports.Address1716909063156 = Address1716909063156;
