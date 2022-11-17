import { DatabaseType, DataSource, DataSourceOptions, EntitySchema } from 'typeorm';
import { OrbitDbConnector } from '../orbit';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

/**
 * ====================================
 * 🧪🔬 TEST OF OLDF WORKER🩺🧫
 * ====================================
 */
describe(`🟡 Testing OrbitDbConnector with [${process.env['DB0_type']}] DB Props ...`, () => {
  it('Return a DataSource Object', async () => {
    const props: any = {
      name: process.env['DB0_name'],
      type: process.env['DB0_type'],
      host: process.env['DB0_host'],
      // @ts-ignore
      port: +process.env['DB0_port'],
      username: process.env['DB0_username'],
      password: process.env['DB0_password'],
      database: process.env['DB0_database'],
      synchronize: false,
      // logging: ["info", "error"], // boolean | "all" | ("query" | "schema" | "error" | "warn" | "info" | "log" | "migration")[]
    };

    console.log(props);

    const con = await new OrbitDbConnector().doConnection(props);

    // console.log(con);

    expect(con).toBeInstanceOf(DataSource);

    await con.destroy();

    return;
  });
});
