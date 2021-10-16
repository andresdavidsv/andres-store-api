## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Commands Example

- Controllers Generate => nest g co moduleName/controllers/categories
- Services Generate => nest g s moduleName/services/products
- Pipeslines Generate => nest g pi common/parse-int
- Modules Generate => nest g mo users
- Resource Generate => nest g resource orders
- Global Module Generate => nest g mo database

## Dependences Example
- Class Validator and Mapped Types => npm i class-validator class-transformer @nestjs/mapped-types
- Config Env => npm i @nestjs/config
- Joi => npm i --save joi
- Documentation => npm install --save @nestjs/swagger swagger-ui-express

## Docker Config
- docker compose up -d andresStoreDb
- docker compose ps
- docker compose down
### Logs
- docker compose logs -f andresStoreDb
### Unix System
- docker compose exec andresStoreDb bash
### Conection to my DB
- psql -h localhost -d andres_store_db -U root
- View my Data => \d+
- Exit from my Data => \q
- Exit from my container => exit
### Driver PostgreSQL
- npm install pg
- npm install @types/pg -D
- npm install --save @nestjs/typeorm typeorm
