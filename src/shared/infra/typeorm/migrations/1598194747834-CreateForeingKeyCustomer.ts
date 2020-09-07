import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateForeingKeyCustomer1598194747834
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersCustomer',
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        columnNames: ['customer'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
  }
}
