'use strict'

const UserModel = require('./consultsModel');
const controller = {};

//Controller function to list all users
controller.listAll = (req, res) => {

    //Get connection to db
    req.getConnection((err, conn) => {
        //If an error has ocurred
        if(err) return res.status(500).send({msg: `An error has ocurred in server:${err}`})

        //Run query to get all users
        conn.query('SELECT * FROM users', (err, users) => {
            res.json(users)
        });

    });

}

//Controller function to save users
controller.save = (req, res) => {
    const data = req.body;

    //Get connection to db
    req.getConnection((err, conn) => {
        //If an error has ocurred
        if(err) return res.status(500).send({msg: `An error has ocurred in server:${err}`})

        //Run query to get all users
        conn.query('INSERT INTO users set ?', [data], (err, user) => {
            //If an error has ocurred and this resource already exists in database
            if(err && err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send({
                    status: 409,
                    msg: `This resource already exists in db`
                })
            }

            //If an error has ocurred and this resource not exists in database
            if(err && err.code !== 'ER_DUP_ENTRY') {
                return res.status(500).send({
                    status: 500,
                    msg: `An error has ocurred in server: ${err}`
                })
            }

            UserModel.getById(conn, user.insertId)
                //If the consult has a successfully state
                .then((data) => {
                    res.status(201).send(data)
                })
                //If has ocurred an error
                .catch((reason) => {
                    res.status(500).send({status: 500, msg: 'error', reason: reason})
                })
        });
    });
}

module.exports = controller;