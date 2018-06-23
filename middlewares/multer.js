  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');
  const storage = multer.diskStorage({
    destination:function(req, file, cb){
      var dir ="./public/images/jpg"
       if(!fs.existsSync(dir)){
         fs.mkdirSync(dir)
       }
      cb(null,dir)
    },
    filename(req, file, cb){
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  });
  const upload = multer({
    storage,
    fileFilter:function(req, file, cb){
     if(req.get("x-custom-header") === file.originalname){
             return checkFileType(file, cb)
     }else{
       res.json({status:'fail',msg:"Access denied."})
     }
    }
  }).single("image");

  checkFileType = (file, cb) => {
    const requireMimetype = "image/jpeg";
    const checkMimeType = file.mimetype == requireMimetype ? true : false;
     if(checkMimeType){
      return cb(null,true)
    }else{
      cb("Error:Only jpg images are allowed.")
    }
  }

  module.exports = upload;
