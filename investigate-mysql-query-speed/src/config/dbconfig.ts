import { DataSource, DataSourceOptions } from 'typeorm';
export const dbConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'khalid',
  database: 'investigate',
  logging: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
};
const connectionSource = new DataSource(dbConfig);

export default connectionSource;
