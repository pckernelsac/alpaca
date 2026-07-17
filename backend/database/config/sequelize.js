require('ts-node/register');
const path = require('path');

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'alpacart',
    password: process.env.DB_PASSWORD || 'alpacart',
    database: process.env.DB_NAME || 'alpacart',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
  },
  test: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'alpacart',
    password: process.env.DB_PASSWORD || 'alpacart',
    database: (process.env.DB_NAME || 'alpacart') + '_test',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
  },
};
