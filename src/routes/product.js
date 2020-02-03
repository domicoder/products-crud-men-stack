const router = require('express').Router();
const productController = require('../controllers/product');
const multer = require('multer');
const { appConfig } = require('../../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 7
  },
  fileFilter: fileFilter
});

router.get('/product', productController.getAllProducts);

router.post('/product', upload.single('image'), productController.createNewProduct);

module.exports = router;
