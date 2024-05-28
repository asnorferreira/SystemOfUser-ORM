import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class UserRole1716930694721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      })
    );
    await queryRunner.createForeignKeys("user_role", [
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedTableName: "roles",
        referencedColumnNames: ["id"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_role");
  }
}
