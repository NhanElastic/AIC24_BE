import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1728671208154 implements MigrationInterface {
    name = 'Db1728671208154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`Submission_data\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`filename\` varchar(255) NOT NULL,
                \`frame\` varchar(255) NOT NULL,
                \`count\` int NOT NULL DEFAULT '1',
                \`queryId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`Query\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`queryText\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`Submission_data\`
            ADD CONSTRAINT \`FK_80000af7771e14ff70143986d7b\` FOREIGN KEY (\`queryId\`) REFERENCES \`Query\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`Submission_data\` DROP FOREIGN KEY \`FK_80000af7771e14ff70143986d7b\`
        `);
        await queryRunner.query(`
            DROP TABLE \`Query\`
        `);
        await queryRunner.query(`
            DROP TABLE \`Submission_data\`
        `);
    }

}
