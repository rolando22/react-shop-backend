const { Pool } = require('pg');
const { config: 
    { 
        dbUser,
        dbPassword,
        dbHost,
        dbName,
        dbPort, 
    } 
} = require('../config');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
