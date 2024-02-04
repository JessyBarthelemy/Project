import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  number: string;

  @Column({ type: 'varchar', length: 300 })
  street: string;

  @Column({ type: 'varchar', length: 5 })
  postalCode: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'int' })
  restaurantId: number;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.address)
  @JoinColumn()
  restaurant: Restaurant;
}
