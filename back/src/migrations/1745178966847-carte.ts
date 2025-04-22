import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Carte1745178966847 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'carte',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'restaurantId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'carte',
      new TableForeignKey({
        columnNames: ['restaurantId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurant',
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('carte', true);
  }
}
