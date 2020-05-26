import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddFieldsToUsers1590513715131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "firstName",
            type: "varchar",
            isNullable: false,
        }));
        await queryRunner.addColumn("user", new TableColumn({
            name: "lastName",
            type: "varchar",
            isNullable: false,
        }));
        await queryRunner.addColumn("user", new TableColumn({
            name: "createdAt",
            type: "timestamp",
            isNullable: false,
        }));
        await queryRunner.addColumn("user", new TableColumn({
            name: "updatedAt",
            type: "timestamp",
            isNullable: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("user", "firstName");
        await queryRunner.dropColumn("user", "lastName");
        await queryRunner.dropColumn("user", "createdAt");
        await queryRunner.dropColumn("user", "updatedAt");
    }

}
