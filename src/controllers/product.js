const Product = require('../models/product');
const { appConfig } = require('../../config');

exports.createNewProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    code: req.body.code,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    entryDate: req.body.entryDate,
    image: `${appConfig.appProtocol}${appConfig.appHost}:${appConfig.appPort}/${appConfig.appDirStorage}/${req.file.filename}`
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        status: 'Product created successfully',
        code: 201,
        method: 'POST',
        product: {
          id: result._id
        }
      });
    })
    .catch(err => {
      console.log('Error creating a product');
      return res.status(500).json({
        status: 'Error 500 - Internal server error',
        method: 'POST',
        code: 500,
        error: err
      });
    });
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .exec()
    .then(products => {
      const response = {
        count: products.length,
        status: "OK",
        code: 200,
        products: products.map(product => {
          return {
            id: product._id,
            name: product.name,
            code: product.code,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
            entryDate: product.entryDate,
            image: product.image
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).send({
        status: 'Error 500 - Internal server error',
        method: 'GET',
        error: error
      });
    });
};