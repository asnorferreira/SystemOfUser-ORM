import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1716906185022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
