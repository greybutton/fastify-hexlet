import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1590218103758 implements MigrationInterface {
    name = 'CreateUsers1590218103758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "passwordDigest",
                    type: "varchar",
                    isNullable: false,
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
