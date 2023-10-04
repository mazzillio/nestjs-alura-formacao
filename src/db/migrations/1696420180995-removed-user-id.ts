import { MigrationInterface, QueryRunner } from "typeorm";

export class removedUserId1696420180995 implements MigrationInterface {
    name = 'removedUserId1696420180995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "user_id" character varying(100) NOT NULL`);
    }

}
