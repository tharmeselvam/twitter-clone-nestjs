import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserProfilesTable1760086839554 implements MigrationInterface {
    name = 'CreateUserProfilesTable1760086839554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_profiles\` (\`userId\` int NOT NULL, \`name\` varchar(50) NOT NULL, \`bio\` varchar(150) NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_8481388d6325e752cd4d7e26c6d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_8481388d6325e752cd4d7e26c6d\``);
        await queryRunner.query(`DROP TABLE \`user_profiles\``);
    }

}
