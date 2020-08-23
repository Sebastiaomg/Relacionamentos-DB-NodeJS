import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer: Customer) => customer.id, {
    eager: true,
  })
  @JoinColumn({ name: 'customer' })
  customer: Customer;

  @OneToMany(
    () => OrdersProducts,
    (order_products: OrdersProducts) => order_products.order,
    {
      cascade: true,
      eager: true,
    },
  )
  order_products: OrdersProducts[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Order;
