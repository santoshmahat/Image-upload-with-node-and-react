const upload = require('../middlewares/multer');
const webp = require('webp-converter');
const fs = require('fs');
module.exports = {
  saveImage(req, res){
    upload(req, res, err =>{
      if(err){
        return res.json({status:'fail',msg:err})
      }else if(req.file==undefined){
          return res.json({status:'fail',msg:"You must select a image."})
      }else{
        var dir ="./public/images/webp"
         if(!fs.existsSync(dir)){
           fs.mkdirSync(dir)
         }
          webp.cwebp(req.file.path,`${dir}/${req.file.filename.substring(0, req.file.filename.lastIndexOf('.'))}.webp`,"-q 80",function(status){
          return res.json({status:'success',msg:"Image have been save successfully."})
          });

      }
    })
  }
};
