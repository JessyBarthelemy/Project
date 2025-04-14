import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1696277257319 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '200',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'resetPasswordToken',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'resetPasswordExpiration',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'provider',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true);
  }
}
