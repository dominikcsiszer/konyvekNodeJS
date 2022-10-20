const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

pool.getConnection((err, connection) => {
    if(err) throw err
    console.log('Database connected as ID ' + connection.threadId)
})

function getData(select, render) {
    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(`SELECT ${select} FROM konyv k
        inner join szerzo sz on k.szerzo = sz.szerzo_id
        inner join kiado ki on k.kiado = ki.kiado_id
        inner join mufaj m on k.mufaj = m.mufaj_id`, (err, rows) => {
            connection.release()
            if(!err) {
                return render
            }
            else
                return err
        })
    })
}

module.exports = pool