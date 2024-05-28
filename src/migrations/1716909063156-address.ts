import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Address1716909063156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      })
    );
    await queryRunner.createForeignKey(
      "addresses",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("addresses");
  }
}
