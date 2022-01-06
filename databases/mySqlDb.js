const Sequelize = require('sequelize');

const config = {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  pool: {
    max: 2,
    min: 0,
    acquire: 5000,
    idle: 3000,
    port: process.env.MYSQL_PORT,
  },
  dialectOptions: {
    timezone: '+00:00',
  },
};

if (process.env.ENVIRONMENT === 'production') {
  config.logging = false;
}

const instance = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  config
);

instance
  .authenticate()
  .then(() => {
    console.log(
      'Database SQL : connection has been established successfully.'
    );
  })
  .catch((err) => {
    console.error(err);
    throw new Error(
      'Database SQL : unable to connect to the database:'
    );
  });

const importModel = (model) => {
  return require(model)(instance, Sequelize);
};

module.exports = {
  instance,
  importModel,
};
