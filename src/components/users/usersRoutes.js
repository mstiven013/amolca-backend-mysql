'use strict'

//Require express components
const express = require('express');
const router = express.Router();

//Require users components
const userCtrl = require('./usersController');

router.get('/', userCtrl.listAll);
router.post('/', userCtrl.save);

module.exports = router;