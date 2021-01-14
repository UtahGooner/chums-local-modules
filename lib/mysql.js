const mysql2 = require('mysql2/promise');

const config = {
    connectionLimit: process.env.MYSQL_POOL_LIMIT || 5,
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'shopify',
    namedPlaceholders: true,
};

async function getConnection() {
    const {connectionLimit, ...connectionConfig} = config;
    return mysql2.createConnection({...connectionConfig});
}

const mysql2Pool = mysql2.createPool({...config, namedPlaceholders: true});

exports.mysql2Pool = mysql2Pool;
exports.getConnection = getConnection;