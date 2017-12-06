const Place = require('../models/place')
const upload = require('../config/upload')
const helpers = require('./helpers')
// const uplo = require('../models/Upload')

const validParams = ['title','description','address', 'acceptCreditCard','openHour','closeHour']

function find(req,res,next) {
  Place.findOne({slug:req.params.id})
  .then(place=>{
    req.place = place
    next()
  }).catch(err=>{
    next(err)
  })
}


function index(req,res) {
  Place.paginate({},{ page:req.query.page || 1, limit: 4, sort:{'_id':-1}})
  .then(docs=>{
    res.json(docs)
  }).catch(err=>{
    res.json(err)
  })
}

function showOne(req,res) {
  // Place.findById(req.params.id,(err,doc)=>{
  //   !err ? res.json(doc) : res.json(err)
  // })
  res.json(req.place)
}

function create(req,res,next) {
  const params = helpers.buildParams(validParams,req.body)
  Place.create(params).then(doc=>{
    req.place = doc
    // res.json(req.place)
    next()
  }).catch(err=>{
    next(err)
  })
}

function update(req,res) {
  const params = helpers.buildParams(validParams,req.body)
  Place.findOneAndUpdate({slug:req.params.id},params,{new:true})
  .then(doc=>{
    res.json(doc)
  }).catch(err=>{
    res.json(err)
  })
}

function destroy(req,res) {
  req.place.remove().then(doc=>{
    res.json({msj:'datos eliminados'})
  }).catch(err=>{
    res.json(err)
  })
}

function multerMiddleware() {
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount:1}
  ]);
}

function saveImage(req,res) {
  if (req.place) {
    const files = ['avatar','cover'];
    const promises = []
    // Place.images().then(function (result) {


    files.forEach(imageType=>{
      if(req.files && req.files[imageType]){
        const path = req.files[imageType][0].path;
          req.place.updateImage(path,imageType)
        }
      })

    Promise.all(promises)
    .then(results=>{
      res.json(req.place)
    }).catch(err=>{
      console.log("error",err);
      res.json(err)
    });

  }else {
    res.status(422).json({
      error:req.error || 'Not save place'
    })
  }
}

module.exports = {index, create, showOne, update, destroy, find, multerMiddleware, saveImage}
