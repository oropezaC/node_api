const User = require('../models/User')
const helpers = require('./helpers')

const validParams = ['email','name','password'];

function create(req,res,next) {
  const params = helpers.buildParams(validParams,req.body)

  User.create(params).then(user=>{
    req.user = user;
    next()
    // res.json(user)
  }).catch(error=>{
    res.status(422).json(error)
  })
}

function destroyAll(req,res) {
  User.remove({}).then(r=>res.json({}))
}
module.exports = { create,destroyAll };
