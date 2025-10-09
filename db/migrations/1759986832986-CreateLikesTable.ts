import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikesTable1759986832986 implements MigrationInterface {
    name = 'CreateLikesTable1759986832986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`tweetId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_2afdac173b8919d70a4224c450\` (\`tweetId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_c11000826858057d4e6306a43ad\` FOREIGN KEY (\`tweetId\`) REFERENCES \`tweets\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_cfd8e81fac09d7339a32e57d904\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_cfd8e81fac09d7339a32e57d904\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_c11000826858057d4e6306a43ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_2afdac173b8919d70a4224c450\` ON \`likes\``);
        await queryRunner.query(`DROP TABLE \`likes\``);
    }

}
