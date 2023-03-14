const db = require('../db');
const Router = require('express-promise-router');

const router = new Router();

// /products
router.get('/', async (req, res) => {
  console.log('/products route accessed');
  res.sendStatus(200);
})


// /products/:product_id
router.get('/:id', async (req, res) => {
  console.log(`/products/:id route accessed, ${req.params.id}`);
  res.sendStatus(200);
})


// /products/:product_id/styles
router.get('/:id/styles', async (req, res) => {
  console.log('/products/:id/styles route accessed');
  res.sendStatus(200);
})


// /products/:product_id/related
router.get('/:id/related', async (req, res) => {
  console.log('/products/:id/related route accessed');
  res.sendStatus(200);
})

// export these routes to be used as middleware in server/index.js
module.exports = router;