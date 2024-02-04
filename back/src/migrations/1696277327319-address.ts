import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Addresses1696277327319 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '300',
            isNullable: false,
          },
          {
            name: 'postalCode',
            type: 'varchar',
            length: '5',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'restaurantId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['restaurantId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurant',
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address', true);
  }
}
