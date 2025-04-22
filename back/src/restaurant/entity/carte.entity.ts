import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Carte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'int' })
  restaurantId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.cartes)
  restaurant: Restaurant;
}
