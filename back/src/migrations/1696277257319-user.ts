import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1696277257319 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            isNullable: false,
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
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
