const multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const filter = (req, file, callback) => {
  if (!file.mimetype.match("image/")) {

    callback(null, false);
  }else{

    callback(null, true)
  }
};

const upload = multer({
  fileFilter: filter,
  limits: 2097152,
  storage: storage,
    },
  );

module.exports = upload

