const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const uplo = require('./Upload');
const slugify = require('../plugins/slugify')

let placeSchema = new mongoose.Schema({
  title:{type:String, required: true},
  description: String,
  acceptCreditCard:{type:Boolean,default:false},
  coverImage:String,
  avatarImage:String,
  openHour:Number,
  closeHour:Number,
  address: String,
  slug :{
    type: String,
    unique: true
  }
});

placeSchema.methods.updateImage = function (path,imageType) {
  // this[imageType+'Image'] = path
  //   return this.save()
  return uplo(path)
    .then(secure_url =>this.saveImageUrl(secure_url,imageType))
}

placeSchema.methods.saveImageUrl = function (secureUrl,imageType) {
  this[imageType+'Image'] = secureUrl
  return this.save()
}

placeSchema.pre('save',function(next) {
  generateSlugAndContinue.call(this,0,next)
})

placeSchema.statics.validateSlugCount = function (slug) {
  return Place.count({slug:slug}).then(count=>{
    if (count > 0 ) return false;
      return true;
  })
}

function generateSlugAndContinue(count,next) {
  this.slug = slugify(this.title)
  if (count != 0)
   this.slug = this.slug + "-" + count;

  Place.validateSlugCount(this.slug).then(isValid=>{
    if (!isValid)
      return generateSlugAndContinue.call(this,count+1,next)

    next()
  })
}

placeSchema.plugin(mongoosePaginate)
let Place = mongoose.model('Place',placeSchema)

module.exports = Place;
