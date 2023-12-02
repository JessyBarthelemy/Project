import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export const PASSWORD_MIN_LENGTH = 6;

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  resetPasswordToken: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'timestamptz', nullable: true })
  resetPasswordExpiration: Date;
}
