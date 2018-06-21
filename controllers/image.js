const upload = require('../middlewares/multer');
module.exports = {
  saveImage(req, res){
    upload(req, res, err =>{
      if(err){
        return res.json({status:'fail',msg:err})
      }else if(req.file==undefined){
          return res.json({status:'fail',msg:"You must select a image."})
      }else{
        console.log("req.file",req.file);
        return res.json({status:'success',msg:"Image have been save successfully."})
      }
    })
  }
};
