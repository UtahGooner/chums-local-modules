const mysql2 = require('mysql2/promise');

const config = {
    connectionLimit: process.env.MYSQL_POOL_LIMIT || 5,
    host: process.env.MYSQL_SERVER || '',
    user: process.env.MYSQL_USERNAME || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || '',
    namedPlaceholders: true,
};

export async function getConnection() {
    const {connectionLimit, ...connectionConfig} = config;
    return mysql2.createConnection({...connectionConfig});
}

export const mysql2Pool = mysql2.createPool({...config});
