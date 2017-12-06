const express = require('express');
let router = express.Router();

const sessionCtrl = require('../controller/sessionController')

router.route('/')
  .post(
    sessionCtrl.auth,
    sessionCtrl.generateToken,
    sessionCtrl.sendToken);

module.exports = router;
