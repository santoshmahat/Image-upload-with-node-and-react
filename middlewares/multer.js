  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');
  const storage = multer.diskStorage({
    destination:'./public/images/jpg',
    filename(req, file, cb){
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  });
  const upload = multer({
    storage,
    fileFilter:function(req, file, cb){
      checkFileType(file, cb)
    }
  }).single("image");

  checkFileType = (file, cb) => {
    console.log("check file",file);
    const requireMimetype = "image/jpeg";
    const checkMimeType = file.mimetype == requireMimetype ? true : false;
    console.log("checkMimeType",file);
     if(checkMimeType){
      return cb(null,true)
    }else{
      cb("Error:Only jpg images are allowed.")
    }
  }

  module.exports = upload;
