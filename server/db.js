const { Pool } = require('pg');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/config/config.json`)[env];

const pool = new Pool({
    user: config.username,
    host: config.host,
    database: config.database,
    password: config.password,
})

// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })

module.exports = pool;
