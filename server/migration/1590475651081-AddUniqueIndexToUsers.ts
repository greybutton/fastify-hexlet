import {MigrationInterface, QueryRunner, TableIndex} from "typeorm";

export class AddUniqueIndexToUsers1590475651081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createIndex("user", new TableIndex({
            name: "IDX_USER_EMAIL",
            columnNames: ["email"],
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex("user", "IDX_USER_EMAIL");
    }

}
