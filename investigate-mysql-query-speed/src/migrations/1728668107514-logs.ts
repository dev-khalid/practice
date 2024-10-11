import { MigrationInterface, QueryRunner } from 'typeorm';

export class Logs1728668107514 implements MigrationInterface {
  name = 'Logs1728668107514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS\`logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`companyId\` int NOT NULL, \`ticketId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`correlationId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`logs\``);
  }
}
