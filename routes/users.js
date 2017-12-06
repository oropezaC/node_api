const express = require('express');
let router = express.Router();
const usersCtrl = require('../controller/usersController')
const sessionCtrl = require('../controller/sessionController')

router.route('/')
  .post(
    usersCtrl.create,
    sessionCtrl.generateToken,
    sessionCtrl.sendToken)
  .get(usersCtrl.destroyAll)

module.exports = router;
