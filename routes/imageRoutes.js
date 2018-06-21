const imageController = require('../controllers/image');
module.exports = (app) => {
  app.post('/images',imageController.saveImage);
}
