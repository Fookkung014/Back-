const mysql = require('mysql2/promise');

    const db = mysql.createPool({
        user:'root',
        host:'mysql_db',
        password:'root1234',
        database:'app_db',
        charset:'utf8mb4',
    })

    module.exports = db;