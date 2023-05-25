# 💾 OrbitDbConnector 🚀

[![Version](https://img.shields.io/npm/v/orbitdbconnector.svg)](https://www.npmjs.com/package/orbit-db-connector)
[![License](https://img.shields.io/npm/l/orbitdbconnector.svg)](https://github.com/orbitturner/OrbitDbConnector/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/orbitturner/OrbitDbConnector.svg)](https://github.com/orbitturner/OrbitDbConnector/issues)
[![GitHub stars](https://img.shields.io/github/stars/orbitturner/OrbitDbConnector.svg)](https://github.com/orbitturner/OrbitDbConnector/stargazers)

## **🔌 Un moyen simple et performant de vous connecter à une ou plusieurs bases de données avec Node.js ! 🌟**

<p align="center">
  <a href="http://orbitturner.com/"><img src="https://cdn.discordapp.com/attachments/788166136382226463/1111205097259679804/ORBIT_DB_CONNECTOR.gif" width="auto" alt="Orbit DB Connector Presentation"/></a>
</p>

OrbitDbConnector est un package innovant conçu pour les développeurs soucieux des performances, qui veulent simplifier la gestion des connexions à leurs bases de données. Que vous ayez besoin de vous connecter à une base de données ou à plusieurs bases de données, OrbitDbConnector facilite grandement le processus et vous permet de gagner du temps ⏰ et de l'énergie ⚡️.

## Pourquoi choisir OrbitDbConnector ? 🤔

✅ **Facile à utiliser** : Avec OrbitDbConnector, vous pouvez vous connecter à vos bases de données en seulement quelques lignes de code. Son API simple et intuitive vous permet de configurer rapidement vos connexions et de les utiliser dans votre application.

✅ **Connexions dynamiques** : OrbitDbConnector vous permet de gérer dynamiquement vos connexions à travers un tableau interne intelligent. Il réutilise les connexions existantes qui correspondent aux mêmes critères de connexion, ce qui évite les frais généraux liés à la création de nouvelles connexions à chaque requête.

✅ **Performances optimisées** : En utilisant un moteur modifié de TypeORM et des techniques avancées de gestion des connexions, OrbitDbConnector garantit des performances exceptionnelles. Il minimise les temps de latence, réduit la charge sur vos bases de données et optimise le temps de réponse de vos requêtes.

✅ **Compatible avec TypeORM** : OrbitDbConnector est construit sur la base solide de TypeORM, une bibliothèque d'ORM populaire pour Node.js. Il bénéficie de toutes les fonctionnalités avancées de TypeORM, vous offrant ainsi une expérience de développement complète et puissante.

✅ **Multitudes de Bases / Drivers** : OrbitDbConnector prend en charge la connexion à quasi toute les Bases de Données 😉 : "mysql", "postgres", "cockroachdb", "sap", "spanner", "mariadb", "sqlite", "cordova", "react-native", "nativescript", "sqljs", "oracle", "mssql", "mongodb", "aurora-mysql", "aurora-postgres", "expo", "better-sqlite3", "capacitor". 🔥🔥


## Installation 📦

Pour installer OrbitDbConnector, utilisez la commande suivante :

```shell
npm install orbitdbconnector --save

or 

yarn add orbitdbconnector
```

## Utilisation 💡
Importez OrbitDbConnector dans votre projet :

```typescript
import { OrbitDbConnector } from 'orbit-db-connector';
```

### Méthode doConnection
La méthode doConnection est la passerelle utilisée pour exécuter le connecteur Orbit et renvoyer les nouvelles données de connexion à l'appelant. Elle accepte les paramètres connectionProps (options de connexion) et entities (entités liées à la base de données) et renvoie une promesse contenant l'objet DataSource correspondant à la connexion établie.

* **🚩 Exemple d'utilisation avec une entité TypeORM:**
Vous pouvez vous connectez à une base sur une table précise et bénéficier du typage dynamique et des fonctionnalités de TypeORM rien qu'en passant une entité TypeORM à la méthode doConnection.
```typescript	
const orbitDbConnector = new OrbitDbConnector();

const dbCon = await orbitDbConnector.doConnection(
  {
    name: process.env['DB0_name'],
    type: process.env['DB0_type'],
    host: process.env['DB0_host'],
    port: +process.env['DB0_port'],
    username: process.env['DB0_username'],
    password: process.env['DB0_password'],
    database: process.env['DB0_database'],
    autoLoadEntities: true,
    synchronize: false,
  },
  [QcwsSettings]
);

const smbSharesList = await dbCon.manager.findOne(QcwsSettings, {
  where: { name: 'SMB_SHARES' },
});

console.log(smbSharesList);
```

Dans cet exemple, nous utilisons OrbitDbConnector avec une entité TypeORM appelée QcwsSettings. Nous créons une instance d'OrbitDbConnector, puis nous utilisons la méthode doConnection pour établir une connexion à une base de données spécifique en passant les options de connexion et l'entité TypeORM. Ensuite, nous utilisons la connexion établie (dbCon) pour effectuer des opérations sur la base de données, comme trouver un enregistrement avec certaines conditions.

* **🚩 Exemple d'utilisation sans entité :**
Vous pouvez, si vous le souhaitez, vous connecter à une base de données sans entité TypeORM. Cela peut être utile si vous souhaitez simplement exécuter des requêtes SQL brutes sur une base de données sans avoir à créer une entité TypeORM pour elle ou si vous souhaitez à partir d'une seule connexion, exécuter des requêtes sur plusieurs tables différentes.

```typescript
const orbitDbConnector = new OrbitDbConnector();

const dbCon = await orbitDbConnector.doConnection({
  name: process.env['DB0_name'],
  type: process.env['DB0_type'],
  host: process.env['DB0_host'],
  port: +process.env['DB0_port'],
  username: process.env['DB0_username'],
  password: process.env['DB0_password'],
  database: process.env['DB0_database'],
  autoLoadEntities: true,
  synchronize: false,
}, 'name');

const indice = await dbCon.manager.query(
  `SELECT MAX(INDICE) AS lastindice FROM ${campainMapping.tableClient}`,
);

console.log(indice);
```

Dans cet exemple, nous utilisons OrbitDbConnector sans entité TypeORM spécifique. Nous créons une instance d'OrbitDbConnector, puis nous utilisons la méthode doConnection pour établir une connexion à une base de données spécifique en passant les options de connexion. Ensuite, nous utilisons la connexion établie (dbCon) pour exécuter une requête personnalisée en utilisant dbCon.manager.query.

### Configuration des options de connexion
L'objet `connectionProps` passé à la méthode `doConnection` doit contenir les options de connexion suivantes :

- `name`: Le nom de la connexion.
- `type`: Le type de la base de données (par exemple, "mysql", "postgres", "mongodb", etc.).
- `host`: L'hôte de la base de données.
- `port`: Le port de la base de données.
- `username`: Le nom d'utilisateur pour la connexion à la base de données.
- `password`: Le mot de passe pour la connexion à la base de données.
- `database`: Le nom de la base de données.
- `autoLoadEntities`: Une valeur booléenne indiquant si les entités doivent être automatiquement chargées à partir du répertoire spécifié.
- `synchronize`: Une valeur booléenne indiquant si la synchronisation automatique des schémas de base de données doit être activée.

Si vous spécifiez des entités (`entities`) dans la méthode `doConnection`, OrbitDbConnector utilise le nom de la première entité pour effectuer une correspondance plus précise lors de la recherche d'une connexion existante dans le tableau interne. Cela garantit que la correspondance est basée sur le nom de la base de données et le nom de la table associée à l'entité.

Notez que ces options sont ceux que prennent aussi un DataSource TypeORM. Pour plus d'informations, consultez la documentation de [TypeORM](https://typeorm.io/data-source-options).

## Fonctionnalités

- **Connexion à plusieurs bases de données** : OrbitDbConnector vous permet de vous connecter facilement à plusieurs bases de données en utilisant les options de connexion de TypeORM.

- **Gestion automatique des connexions existantes** : Lorsque vous utilisez la méthode `doConnection`, OrbitDbConnector vérifie s'il existe déjà une connexion pour les mêmes paramètres de connexion et entités. Si une connexion existante est trouvée, elle est renvoyée au lieu d'établir une nouvelle connexion.

- **Gestion des connexions réutilisables** : Une fois qu'une connexion est établie avec succès, OrbitDbConnector la stocke dans un tableau interne pour une utilisation future de manière totalement automatique. Lorsque la méthode doConnection est appelée avec des options de connexion déjà existantes, OrbitDbConnector récupère la connexion existante plutôt que d'en créer une nouvelle en évitant les opérations coûteuses de création de nouvelles connexions à chaque fois.

## Performance

OrbitDbConnector offre des améliorations significatives de performance par rapport à une approche traditionnelle de gestion des connexions à plusieurs bases de données. Voici en quoi OrbitDbConnector se distingue :

### * Réutilisation intelligente des connexions

L'une des forces d'OrbitDbConnector réside dans sa capacité à réutiliser intelligemment les connexions existantes. En utilisant un mécanisme de correspondance basé sur des critères tels que le nom de la connexion, le nom de la base de données et le nom de la table associée à l'entité, OrbitDbConnector peut identifier rapidement si une connexion correspondante existe déjà dans le tableau `ODConnectionArray`. Cette approche garantit une correspondance précise entre la requête et la connexion, permettant ainsi une réutilisation efficace des connexions existantes. La réutilisation des connexions réduit les temps de latence associés à la création et à la fermeture de connexions à chaque requête, améliorant ainsi les performances globales.

### * Optimisations de TypeORM

OrbitDbConnector est construit sur la base de TypeORM, une bibliothèque d'ORM populaire pour Node.js. En utilisant un moteur modifié de TypeORM, OrbitDbConnector intègre des optimisations spécifiques pour gérer efficacement les connexions multiples et maximiser les performances des opérations de base de données. Ces optimisations incluent la mise en cache des métadonnées des entités, la gestion fine des transactions et l'utilisation de requêtes préparées. Ces améliorations techniques contribuent à réduire la charge sur la base de données, à améliorer le temps de réponse des requêtes et à optimiser les performances globales de l'application.

Grâce à ces techniques avancées de gestion des connexions et aux optimisations de TypeORM, OrbitDbConnector permet d'obtenir des performances exceptionnelles lors de l'accès à des bases de données multiples, offrant ainsi une expérience utilisateur fluide et une exécution rapide des opérations de base de données.

Commencez dès maintenant à connecter facilement vos bases de données avec style et performance grâce à OrbitDbConnector !



## Configuration

Avant d'utiliser OrbitDbConnector, assurez-vous d'avoir les informations de connexion correctes pour vos bases de données. Vous pouvez les stocker dans des variables d'environnement ou les inclure directement dans votre code.

## API

### Classe `OrbitDbConnector`

La classe `OrbitDbConnector` représente le point d'entrée principal de la bibliothèque. Elle expose une méthode `doConnection` pour établir des connexions à des bases de données.

#### Méthode `doConnection(connectionProps: DataSourceOptions, entities?: (string | EntitySchema<any> | EntityClassOrSchema)[]): Promise<DataSource>`

La méthode `doConnection` permet d'établir une connexion à une base de données en utilisant les options de connexion `connectionProps` fournies. Vous pouvez également spécifier les entités liées à la base de données en utilisant le paramètre `entities`. Cette méthode renvoie une promesse contenant l'objet `DataSource` correspondant à la connexion établie.

## Next Steps / Coming Soon
- CLI Tool for DB Connections.
- Website & Documentation.
- ...

### Licence

OrbitDbConnector est distribué sous la licence MIT. Pour plus d'informations, veuillez consulter le fichier [LICENSE](https://github.com/orbitturner/OrbitDbConnector/blob/main/LICENSE).

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez améliorer OrbitDbConnector, veuillez consulter les [instructions de contribution](https://github.com/orbitturner/OrbitDbConnector/blob/main/CONTRIBUTING.md) pour savoir comment commencer.

1. Forkez le projet depuis [le dépôt GitHub](https://github.com/orbitturner/OrbitDbConnector).
2. Créez une branche pour votre fonctionnalité ou correction de bug : `git checkout -b ma-branche`.
3. Faites vos modifications et commit : `git commit -m "Ma modification"`.
4. Poussez les modifications vers votre dépôt : `git push origin ma-branche`.
5. Ouvrez une pull request vers la branche `main` du dépôt OrbitDbConnector.

## Auteur

OrbitDbConnector a été développé par [OrbitTurner](https://github.com/OrbitTurner).

Pour plus d'informations, vous pouvez me contacter par e-mail à [orbitturner@gmail.com](mailto:orbitturner@gmail.com)

---

Merci d'avoir choisi OrbitDbConnector ! Nous espérons que cette bibliothèque vous aidera à simplifier et à améliorer vos connexions dynamiques.
<h2 align="left">🚀FOLLOW THE ADVENTURE ! <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px"> 🚀</h2>

```
*
*
*     ██████╗ ██████╗ ██████╗ ██╗████████╗    ████████╗██╗   ██╗██████╗ ███╗   ██╗███████╗██████╗ 
*    ██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝    ╚══██╔══╝██║   ██║██╔══██╗████╗  ██║██╔════╝██╔══██╗
*    ██║   ██║██████╔╝██████╔╝██║   ██║          ██║   ██║   ██║██████╔╝██╔██╗ ██║█████╗  ██████╔╝
*    ██║   ██║██╔══██╗██╔══██╗██║   ██║          ██║   ██║   ██║██╔══██╗██║╚██╗██║██╔══╝  ██╔══██╗
*    ╚██████╔╝██║  ██║██████╔╝██║   ██║          ██║   ╚██████╔╝██║  ██║██║ ╚████║███████╗██║  ██║
*     ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝          ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
*   
*
```
*Better Things are Comming !*

<br/>


______________________________________________________
**❤ KEEP GOING FURTHER ❤**


<img src="https://github.com/orbitturner/challenger/blob/master/images/OrbitTurner_Gaming_GitHubBadge.png?raw=true" align="right" />