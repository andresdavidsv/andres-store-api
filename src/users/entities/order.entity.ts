import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({ ...item.product, quantity: item.quantity }));
    }
    return [];
  }
  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((acc, item) => {
          const accItem = item.product.price * item.quantity;
          return acc + accItem;
        }, 0);
    }
    return 0;
  }
}
