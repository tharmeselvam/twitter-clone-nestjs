import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRepliesRelation1760072882951 implements MigrationInterface {
    name = 'CreateRepliesRelation1760072882951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tweets\` ADD \`parentTweetId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tweets\` ADD CONSTRAINT \`FK_7f22ed3870e50ea16b8490af8f8\` FOREIGN KEY (\`parentTweetId\`) REFERENCES \`tweets\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tweets\` DROP FOREIGN KEY \`FK_7f22ed3870e50ea16b8490af8f8\``);
        await queryRunner.query(`ALTER TABLE \`tweets\` DROP COLUMN \`parentTweetId\``);
    }

}
