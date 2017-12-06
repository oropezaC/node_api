const multer = require('multer')
const uiid = require('uuid/v4')

module.exports = multer({
  dest:'uploads/',
  filename:uiid()
})
