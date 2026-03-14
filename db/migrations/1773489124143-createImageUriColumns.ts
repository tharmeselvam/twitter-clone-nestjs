import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImageUriColumns1773489124143 implements MigrationInterface {
    name = 'CreateImageUriColumns1773489124143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "profileImageUri" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "headerImageUri" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "headerImageUri"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "profileImageUri"`);
    }

}
