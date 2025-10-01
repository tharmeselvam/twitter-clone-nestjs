import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTweetsTable1759294066584 implements MigrationInterface {
    name = 'CreateTweetsTable1759294066584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tweets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(280) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tweets\` ADD CONSTRAINT \`FK_8039099215c037f10c11b0cf228\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tweets\` DROP FOREIGN KEY \`FK_8039099215c037f10c11b0cf228\``);
        await queryRunner.query(`DROP TABLE \`tweets\``);
    }

}
