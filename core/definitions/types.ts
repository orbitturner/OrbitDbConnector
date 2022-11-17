import { DataSource, EntitySchema } from 'typeorm';

export declare type EntityClassOrSchema = () => void | EntitySchema;
export const ODConnectionArray: {
  name: string;
  con: DataSource;
  database: string;
  tableName: string;
}[] = [];
