import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ColumnOptions,
  getMetadataArgsStorage,
} from 'typeorm';
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';

export function TestCreateDateColumn(
  options?: ColumnOptions,
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName: propertyName,
      mode: 'number' as 'createDate',
      options: options || {},
    });
  };
}
export abstract class AbstractTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'int',
    default: 0,
  })
  ctime: number;
  @Column({
    type: 'int',
    default: 0,
  })
  mtime: number;
  @Column({
    type: 'int',
    default: 0,
  })
  dtime: number;
  @BeforeInsert()
  initCtimeAndMtime() {
    this.ctime = ~~(+new Date() / 1000);
    this.mtime = ~~(+new Date() / 1000);
  }
  @BeforeUpdate()
  updateMtime() {
    console.log('BeforeUpdate');
    this.mtime = ~~(+new Date() / 1000);
  }
}
