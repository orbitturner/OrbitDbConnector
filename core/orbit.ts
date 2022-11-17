import { DataSource, DataSourceOptions, EntitySchema } from 'typeorm';
import { EntityClassOrSchema, ODConnectionArray } from './definitions/types';
import OrbitLogger from './helpers/orbitLogger';

// 🟢💻 WELCOME TO THE SPACESHIP - DEVELOPED BY 💻🟢
//  ██████╗ ██████╗ ██████╗ ██╗████████╗    ████████╗██╗   ██╗██████╗ ███╗   ██╗███████╗██████╗
// ██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝    ╚══██╔══╝██║   ██║██╔══██╗████╗  ██║██╔════╝██╔══██╗
// ██║   ██║██████╔╝██████╔╝██║   ██║          ██║   ██║   ██║██████╔╝██╔██╗ ██║█████╗  ██████╔╝
// ██║   ██║██╔══██╗██╔══██╗██║   ██║          ██║   ██║   ██║██╔══██╗██║╚██╗██║██╔══╝  ██╔══██╗
// ╚██████╔╝██║  ██║██████╔╝██║   ██║          ██║   ╚██████╔╝██║  ██║██║ ╚████║███████╗██║  ██║
//  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝          ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
// 💚🔰 KEEP GOING FURTHER 🔰💚
/**
 * 💨 Project Name : Array-Querier
 * 💨 Project Repo : https://github.com/orbitturner/OrbiDbConnector
 * 💨 My GitHub    : https://github.com/orbitturner
 * 💨 My LinkedIn  : https://linkedin.com/in/orbitturner
 * 💨 My Twitter   : https://twitter.com/orbitturner
 */

export class OrbitDbConnector {
  // -------------------------------------
  private logger: OrbitLogger;
  // -------------------------------------
  constructor() {
    this.logger = new OrbitLogger({
      scope: '🖥️ OrbitDbConnector 📡',
    });
  }
  // -------------------------------------

  /**
   * ==================================
   * 🟡⚙ CLASS PUBLIC FACADE ⚙🟡
   * ==================================
   * Gateway used to execute the Orbit Connector
   * and returns the new Connection data to the caller.
   * @return TypeOrmDatasource: DataSource;
   */
  public async doConnection(
    connectionProps: DataSourceOptions,
    entities?: (string | EntitySchema<any> | EntityClassOrSchema)[],
  ): Promise<DataSource> {
    connectionProps = { ...connectionProps, entities };

    const { name, ...props } = connectionProps;
    const tableName = entities?.length > 0 ? props.entities[0]?.name : null;

    this.logger.log(
      `-> Trying To Recover Old Connection From [${connectionProps.name}] - [${connectionProps.database}]...`,
    );
    const oldConIndex =
      entities?.length > 0
        ? ODConnectionArray.findIndex(
            (connexion) =>
              connexion.name === name && connexion.database === props.database && connexion.tableName === tableName,
          )
        : ODConnectionArray.findIndex((connexion) => connexion.name === name && connexion.database === props.database);

    if (oldConIndex !== -1) {
      this.logger.warn(`👁️ FOUND EXISTING CONNECTION FOR [${name}] - [${connectionProps.database}] ! -> USING IT...`);
      return ODConnectionArray[oldConIndex].con;
    }

    this.logger.log(`-> NO CONNECTION WERE FOUND FOR ${connectionProps.name} - ${connectionProps.database}`);
    this.logger.log(`-> Creating New Connection For [${connectionProps.name}] - ${connectionProps.database}...`);

    const con = (await new DataSource(props)
      .initialize()
      .then((conn) => {
        this.logger.log(`✅ CONNECTION ESTABLISHED TO [${connectionProps.name}] - [${connectionProps.database}] ✅`);
        return conn;
      })
      .catch((err) => {
        this.logger.error(`🚨 UNABLE TO CONNECT TO [${connectionProps.name}] - [${connectionProps.database}] ❌`);
        this.logger.fatal(err);
      })) as DataSource;

    ODConnectionArray.push({
      name,
      database: props.database as string,
      tableName,
      con,
    });

    return con;
  }
}
