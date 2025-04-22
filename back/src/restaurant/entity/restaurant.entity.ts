import { User } from '../../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Carte } from './carte.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar' })
  profilImage: string;

  @ManyToOne(() => User, (user) => user.restaurants)
  user: User;

  @OneToOne(() => Address, (address) => address.restaurant, { cascade: true })
  address: Address;

  @OneToMany(() => Carte, (carte: Carte) => carte.restaurant)
  cartes: Carte[];
}
