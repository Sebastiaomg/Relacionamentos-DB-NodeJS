import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateForeingKeyOrdersOrdersProducts1598197649982
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'OrdersOrdersProducts',
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        columnNames: ['order_id'],
        onUpdate: ' CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'OrdersOrdersProducts');
  }
}
