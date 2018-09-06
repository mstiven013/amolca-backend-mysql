'use strict'

const config = {
    name: 'Amolca backend',
    version: '1.0',
    api: '/api/',
    port: process.env.PORT || 3000,
    secret: 'mysecretkeyapi',

    //Database information
    dbName: 'amolca-store',
    dbUser: 'root',
    dbPassword: '',
    dbHost: 'localhost',
    dbPort: 3306
}

module.exports = config;