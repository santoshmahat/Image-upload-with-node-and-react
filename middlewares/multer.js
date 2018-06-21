const multer = require('multer');
const storage = multer.diskStorage({
    destination:'./public/images',
    filename(req, file, cb){
      cb(null,`${file.fieldname}-${Date.now()}`)
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
    console.log("checkMimeType",checkMimeType);
    if(checkMimeType){
      return cb(null,true)
    }else{
      cb("Error:Only jpg images are allowed")
    }
  }

  module.exports = upload;
