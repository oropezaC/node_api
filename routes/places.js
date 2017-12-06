const express = require('express')

let router = express.Router();

const placeCtrl = require('../controller/placesController')

router.route('/')
  .get(placeCtrl.index)
  .post(
    placeCtrl.multerMiddleware(),
    placeCtrl.create,
    placeCtrl.saveImage)

  router.route('/:id')
  .get(placeCtrl.find,placeCtrl.showOne)
  .put(placeCtrl.update)
  .delete(placeCtrl.find,placeCtrl.destroy)

  module.exports = router;
