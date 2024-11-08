import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'JorgeLopez',
    database: 'ecommerce_db', // base de datos
    password: '123456',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
