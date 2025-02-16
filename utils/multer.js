const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    const numbers = Date.now().toString() + '-' + Math.round(Math.random() * 1E9);
    const extention = file.mimetype.split('/')[1];
    cb(null, `IMG-${numbers}.${extention}`)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    new Error('File format not surpported')
  }
};

const limits = {
  limits: 1024 * 1024 * 10
}

const upload = multer({ limits, fileFilter, storage });

module.exports = upload