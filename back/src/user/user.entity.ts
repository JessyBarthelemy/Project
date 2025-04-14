import { Exclude } from 'class-transformer';
import { Restaurant } from '../restaurant/entity/restaurant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export const PASSWORD_MIN_LENGTH = 6;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 300, nullable: true })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', length: 20, })
  provider: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  resetPasswordToken: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'timestamptz', nullable: true })
  resetPasswordExpiration: Date;

  @OneToMany(() => Restaurant, (restaurant: Restaurant) => restaurant.user)
  restaurants: Restaurant[];
}
