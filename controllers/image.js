const upload = require('../middlewares/multer');
module.exports = {
  saveImage(req, res){
    upload(req, res, err =>{
      if(err){
        return res.json({status:'fail',msg:err})
      }else{
        return res.json({status:'success',msg:"Image have been save successfully"})
      }
    })
  }
};
