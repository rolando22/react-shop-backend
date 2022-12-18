const { Sequelize } = require('sequelize');

const { config: 
    { 
        dbUser,
        dbPassword,
        dbHost,
        dbName,
        dbPort, 
    } 
} = require('../config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log,
});

setupModels(sequelize);

module.exports = sequelize;
