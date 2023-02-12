const fs = require('fs');
const router = require('express').Router();
var product = require('../public/products.json');
router.get('/', (req, res, next) => {
  fs.readFile('./public/products.json', 'utf-8', (err, data) => {
    if (err) {
      return next(err);
    }
    
    res.json({
      products: JSON.parse(data)
    });
  });
});
router.get('/:id', (req, res, next) => {
    fs.readFile('./public/products.json', 'utf-8', (err, data) => {
        res.json({
            result : JSON.parse(data)[req.params.id],
        })
    });
});

router.get('/instock/:qt', (req, res) => {
    const qt = parseInt(req.params.qt, 10);
  const filteredProducts = Object.values(product).filter(product => product.stock >= qt);

  if (filteredProducts.length === 0) {
    return res.status(404).json({ message: 'No products in stock with the specified quantity' });
  }

  res.status(200).json({ products: filteredProducts });
  });

router.get('/:id/:qt', (req, res, next) => {
    fs.readFile('./public/products.json', 'utf-8', (err, data) => {
        res.json({
            result : JSON.parse(data)[req.params.id].price * [req.params.qt],
            id : JSON.parse(data)[req.params.id].name,
            qt : req.params.qt,
            price : JSON.parse(data)[req.params.id].price,

        })
    });
}); 


module.exports = router;
