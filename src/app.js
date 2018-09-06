'use strict'

//Required's
const config = require('./config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const express = require('express');
const app = express();

//Settings
const API_URL = config.api + config.version;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    // Pass to next layer of middleware
    next();
});

//Database connection
app.use(myConnection(mysql, {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    port: config.dbPort,
    database: config.dbName
}));

//Routes
app.use(API_URL + '/users', require('./components/users/usersRoutes'));

//Listen app
app.listen(config.port, () => {
    console.log('Server on port:', config.port);
});