import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id = null;

  @Index({ unique: true })
  @Column('varchar')
  @IsEmail()
  @IsNotEmpty()
  email = '';

  @IsNotEmpty()
  password = '';

  @Column('varchar')
  @IsNotEmpty()
  passwordDigest = '';

  @Column('varchar')
  @IsNotEmpty()
  firstName;

  @Column('varchar')
  @IsNotEmpty()
  lastName;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
