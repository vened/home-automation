const Sequelize = require(`sequelize`);
const defineModels = require(`../models`);
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const somethingIsNotDefined = [
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
].some((it) => it === undefined);

if (somethingIsNotDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

const sequelize = new Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: `postgres`,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000,
      },
    },
);

// Test connection
console.info('SETUP - Connecting database...');

async function PgConnect() {
  try {
    await sequelize.authenticate();
    console.log(`Соединение с сервером установлено!`);
  } catch (err) {
    console.error(`Не удалось установить соединение по причине: ${err}`);
  }
}

PgConnect();

const { Temperature } = defineModels(sequelize);

async function SyncDb(){
  await sequelize.sync({ force: true });
}

SyncDb();

module.exports = {
  sequelize,
  Temperature,
};
