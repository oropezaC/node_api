const cloudinary = require('cloudinary')
const secret = require('../config/secrets')

cloudinary.config(secret.cloudinary);

module.exports = function (imagePath) {
  return new Promise((resolve,reject)=>{
    cloudinary.uploader.upload(imagePath,((result)=>{
      if (result.secure_url) return resolve(result.secure_url)

      reject(new Error('Error whit couldinary'))
    }))
  })
}
