import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AbstractTypeEntity } from '../abstract/typeorm.base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends AbstractTypeEntity {
  @IsString()
  @Column({ length: 500 })
  name: string;
  @IsNumber()
  @IsOptional()
  @Column({
    default: 0,
  })
  sex: number;
  @IsNumber()
  @IsOptional()
  @Column({
    default: 0,
  })
  price: number;
}
