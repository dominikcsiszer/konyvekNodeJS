const sql = require('../modules/dbConnect')

const date = require('date-and-time')

exports.view = (req, res) => {
    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT konyv_id, cim, kiadas_datum, ar, szerzo_nev, kiado_nev, megnevezes, kep FROM konyv k
        inner join szerzo sz on k.szerzo = sz.szerzo_id
        inner join kiado ki on k.kiado = ki.kiado_id
        inner join mufaj m on k.mufaj = m.mufaj_id`, (err, rows) => {
            connection.release()
            if(!err) {
                rows.forEach(element => {
                    element.kiadas_datum = date.format(element.kiadas_datum,'YYYY.MM.DD')
                })
                res.render('home', {rows, view: req.query.view})
            }
            else
                return err
        })
    })
}

exports.adminView = (req, res) => {
    res.render('admin')
}

exports.adminBookView = (req, res) => {
    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT konyv_id, cim, kiadas_datum, ar, szerzo_nev, kiado_nev, megnevezes FROM konyv k
        inner join szerzo sz on k.szerzo = sz.szerzo_id
        inner join kiado ki on k.kiado = ki.kiado_id
        inner join mufaj m on k.mufaj = m.mufaj_id`, (err, rows) => {
            connection.release()
            if(!err) {
                rows.forEach(element => {
                    element.kiadas_datum = date.format(element.kiadas_datum,'YYYY.MM.DD')
                })
                res.render('adminBook', {rows})
            }
            else
                return err
        })
    })
}

exports.viewBook = (req, res) => {
    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT konyv_id, cim, kiadas_datum, ar, szerzo_nev, kiado_nev, megnevezes FROM konyv k
        inner join szerzo sz on k.szerzo = sz.szerzo_id
        inner join kiado ki on k.kiado = ki.kiado_id
        inner join mufaj m on k.mufaj = m.mufaj_id
        WHERE konyv_id = ?`,[req.params.id], (err, rows) => {
            connection.release()
            if(!err) {
                rows.forEach(element => {
                    element.kiadas_datum = date.format(element.kiadas_datum,'YYYY.MM.DD')
                })
                res.render('book', {rows})
            }
            else
                return err
        })
    })
}

exports.editBookView = (req, res) => {
    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT * FROM konyv WHERE konyv_id = ?`,[req.params.id], (err, rows) => {
            connection.release()
            if(!err) {
                rows.forEach(element => {
                    element.kiadas_datum = date.format(element.kiadas_datum,'YYYY-MM-DD')
                })
                sql.getConnection((err, connection) => {
                    if(err) throw err
                    connection.query(`SELECT * FROM szerzo`, (err, rows1) => {
                        connection.release()
                        if(!err) {
                            sql.getConnection((err, connection) => {
                                if(err) throw err
                                connection.query(`SELECT * FROM kiado`, (err, rows2) => {
                                    connection.release()
                                    if(!err) {
                                        sql.getConnection((err, connection) => {
                                            if(err) throw err
                                            connection.query(`SELECT * FROM mufaj`, (err, rows3) => {
                                                connection.release()
                                                if(!err) {
                                                    res.render('edit', {rows, rows1, rows2, rows3})
                                                }
                                                else
                                                    return err
                                            })
                                        })
                                    }
                                    else
                                        return err
                                })
                            })
                        }
                        else
                            return err
                    })
                })
            }
            else
                return err
        })
    })
}

exports.editBook = (req, res) => {
    const {cime, ara, kiadas, kep, szerzo, kiado, mufaj} = req.body

    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`UPDATE konyv
        SET cim = ?, ar = ?, kiadas_datum = ?, kep = ?, szerzo = ?, kiado = ?, mufaj = ?, updated_at = ?
        WHERE konyv_id = ? `,[cime, ara, kiadas, kep, szerzo, kiado, mufaj, new Date(), req.params.id], (err, rows) => {
            connection.release()
            if(!err) {
                sql.getConnection((err, connection) => {
                    if(err) throw err
                    connection.query(`SELECT konyv_id, cim, kiadas_datum, ar, szerzo_nev, kiado_nev, megnevezes FROM konyv k
                    inner join szerzo sz on k.szerzo = sz.szerzo_id
                    inner join kiado ki on k.kiado = ki.kiado_id
                    inner join mufaj m on k.mufaj = m.mufaj_id`, (err, rows) => {
                        connection.release()
                        if(!err) {
                            rows.forEach(element => {
                                element.kiadas_datum = date.format(element.kiadas_datum,'YYYY.MM.DD')
                            })
                            res.render('admin', {rows})
                        }
                        else
                            return err
                    })
                })
            }
            else
                return err
        })
    })
}

exports.newBookView = (req, res) => {

    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT * FROM szerzo`, (err, rows1) => {
            connection.release()
            if(!err) {
                sql.getConnection((err, connection) => {
                    if(err) throw err
                    connection.query(`SELECT * FROM kiado`, (err, rows2) => {
                        connection.release()
                        if(!err) {
                            sql.getConnection((err, connection) => {
                                if(err) throw err
                                connection.query(`SELECT * FROM mufaj`, (err, rows3) => {
                                    connection.release()
                                    if(!err) {
                                        res.render('new', {rows1, rows2, rows3})
                                    }
                                    else
                                        return err
                                })
                            })
                        }
                        else
                            return err
                    })
                })
            }
            else
                return err
        })
    })
}

exports.newBook = (req, res) =>  {
    const {cime, ara, kiadas, szerzo, kiado, kep, mufaj} = req.body
    // kep.move(__dirname + '/public/upload/' + kep)

    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`INSERT INTO konyv SET cim = ?, ar = ?, kiadas_datum = ?, kep = ?, szerzo = ?, kiado = ?, mufaj = ? `,[cime, ara, kiadas, kep, szerzo, kiado, mufaj], (err, rows) => {
            connection.release()
            if(!err) {
                sql.getConnection((err, connection) => {
                    if(err) throw err
                    connection.query(`SELECT konyv_id, cim, kiadas_datum, ar, szerzo_nev, kiado_nev, megnevezes FROM konyv k
                    inner join szerzo sz on k.szerzo = sz.szerzo_id
                    inner join kiado ki on k.kiado = ki.kiado_id
                    inner join mufaj m on k.mufaj = m.mufaj_id`, (err, rows) => {
                        connection.release()
                        if(!err) {
                            rows.forEach(element => {
                                element.kiadas_datum = date.format(element.kiadas_datum,'YYYY.MM.DD')
                            })
                            res.render('admin', {rows})
                        }
                        else
                            return err
                    })
                })
            }
            else
                return err
        })
    })
}

exports.deleteBook = (req, res) => {
    sql.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`DELETE FROM konyv WHERE konyv_id = ?`,[req.params.id], (err, rows) => {
            connection.release()
            if(!err) {
                sql.getConnection((err, connection) => {
                    if(err) throw err
                    connection.query(`SELECT konyv_id, cim, kiadas_datum, ar, szerzo_nev, kiado_nev, megnevezes FROM konyv k
                    inner join szerzo sz on k.szerzo = sz.szerzo_id
                    inner join kiado ki on k.kiado = ki.kiado_id
                    inner join mufaj m on k.mufaj = m.mufaj_id`, (err, rows) => {
                        connection.release()
                        if(!err) {
                            rows.forEach(element => {
                                element.kiadas_datum = date.format(element.kiadas_datum,'YYYY.MM.DD')
                            })
                            res.render('admin', {rows})
                        }
                        else
                            return err
                    })
                })
            }
            else
                return err
        })
    })
}