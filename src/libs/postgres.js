const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin123',
    database: 'react_shop_db',
});

module.exports = pool;
