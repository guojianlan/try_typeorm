import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
} from 'typeorm';
export interface IWarpOptions<T> {
  baseFind?: FindManyOptions<T> | FindConditions<T>;
}
import { QueryBuilder } from 'typeorm/query-builder/QueryBuilder';

(QueryBuilder.prototype as any).createWhereExpression = function () {
  const conditionsArray = [];

  const whereExpression = this.createWhereClausesExpression(
    this.expressionMap.wheres,
  );
  console.log(this.expressionMap);
  if (whereExpression.length > 0 && whereExpression !== '1=1') {
    conditionsArray.push(this.replacePropertyNames(whereExpression));
  }

  if (this.expressionMap.mainAlias!.hasMetadata) {
    const metadata = this.expressionMap.mainAlias!.metadata;
    // console.log(metadata)
    // Adds the global condition of "non-deleted" for the entity with delete date columns in select query.
    if (
      this.expressionMap.queryType === 'select' &&
      !this.expressionMap.withDeleted &&
      metadata.deleteDateColumn
    ) {
      const column = this.expressionMap.aliasNamePrefixingEnabled
        ? this.expressionMap.mainAlias!.name +
          '.' +
          metadata.deleteDateColumn.propertyName
        : metadata.deleteDateColumn.propertyName;
      console.log(column);
      const condition = `${this.replacePropertyNames(column)} = 0`;
      conditionsArray.push(condition);
    }

    if (metadata.discriminatorColumn && metadata.parentEntityMetadata) {
      const column = this.expressionMap.aliasNamePrefixingEnabled
        ? this.expressionMap.mainAlias!.name +
          '.' +
          metadata.discriminatorColumn.databaseName
        : metadata.discriminatorColumn.databaseName;

      const condition = `${this.replacePropertyNames(
        column,
      )} IN (:...discriminatorColumnValues)`;
      conditionsArray.push(condition);
    }
  }

  if (this.expressionMap.extraAppendedAndWhereCondition) {
    const condition = this.replacePropertyNames(
      this.expressionMap.extraAppendedAndWhereCondition,
    );
    conditionsArray.push(condition);
  }
  console.log(conditionsArray);
  if (!conditionsArray.length) {
    return '';
  } else if (conditionsArray.length === 1) {
    return ` WHERE ${conditionsArray[0]}`;
  } else {
    return ` WHERE ( ${conditionsArray.join(' ) AND ( ')} )`;
  }
};
export declare class WrapAbstractTypeOrmRepositoryMethods<T> {
  mFind(options?: FindManyOptions<T>): Promise<T[]>;
  mFind(conditions?: FindConditions<T>): Promise<T[]>;
  mFindOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined>;
  mFindOne(options?: FindOneOptions<T>): Promise<T | undefined>;
  mFindOne(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined>;
  mFindOne(
    optionsOrConditions?:
      | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<T>
      | FindConditions<T>,
    maybeOptions?: FindOneOptions<T>,
  ): Promise<T | undefined>;
}
export type mergeRepositories<T> = Repository<T> &
  WrapAbstractTypeOrmRepositoryMethods<T>;
export function WrapAbstractTypeOrmRepository<T>(opts?: IWarpOptions<T>) {
  abstract class AbstractRepository extends Repository<T> {
    mFind(options?) {
      // this.createQueryBuilder().createWhereExpression;
      return this.find({
        ...options,
        ...opts.baseFind,
      });
    }
    mFindOne(optionsOrConditions, maybeOptions) {
      const passedId =
        typeof optionsOrConditions === 'string' ||
        typeof optionsOrConditions === 'number' ||
        (optionsOrConditions as any) instanceof Date;
      if (passedId && maybeOptions === undefined) {
        return this.findOne(optionsOrConditions, {
          ...opts.baseFind,
        });
      } else {
        return this.findOne({
          ...(optionsOrConditions as any),
          ...maybeOptions,
          ...opts.baseFind,
        });
      }
    }
  }
  return AbstractRepository as new () => {
    [key in keyof AbstractRepository]: AbstractRepository[key];
  };
}
