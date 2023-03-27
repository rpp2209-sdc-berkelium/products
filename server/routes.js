const db = require('../db');
const Router = require('express-promise-router');

const router = new Router();

// /products
router.get('/', async (req, res) => {
  const { page } = req.query;
  const { count } = req.query;

  // define helper function that runs query with default values for page and count
  const fetchProducts = async (page = 1, count = 5) => {
    const results = await db.query('SELECT * FROM products ORDER BY id ASC LIMIT $1 OFFSET $2;', [count, ((page - 1) * count)]);
    return results.rows;
  }

  try {
    const productList = await fetchProducts(page, count);
    res.status(200).send(productList);
  } catch (e) {
    console.log('/products route error', e);
    res.sendStatus(500);
  }
})


// /products/:product_id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const productInfo = await db.query("SELECT products.*, jsonb_agg(jsonb_build_object('feature', features.feature, 'value', features.value)) \
    AS features FROM products LEFT JOIN features ON products.id = features.product_id WHERE products.id = $1 GROUP BY products.id;", [id]);
    res.status(200).send(productInfo.rows[0]);
  } catch (e) {
    console.log('/products/:id route error', e);
    res.sendStatus(500);
  }
})


// /products/:product_id/styles
router.get('/:id/styles', async (req, res) => {
  const { id } = req.params;

  // define sku formatting function
  const formatSkus = (array) => {
    return array.reduce((acc, current) => {
      acc[current.sku_id] = current;
      return acc;
    }, {})
  }

  try {

    //===================== SAVE FOR LATER, MIGHT BE MORE EFFICIENT IN DEPLOYMENT ================================
    // const styleList = await db.query('SELECT s.style_id, s.name, s.sale_price, s.original_price, s.default_style AS "default?", \
    // (SELECT json_agg(p) AS photos FROM (SELECT photos.thumbnail_url, photos.url FROM photos WHERE photos.style_id = s.style_id) AS p), \
    // (SELECT json_agg(skus) AS skus FROM skus WHERE s.style_id = skus.style_id) FROM styles AS s WHERE product_id = $1;', [id]);

    // if skus exist for any of the styles, apply the sku formatting function to each array of skus in the style list
    // for (let style of styleList.rows) {
    //   if (style.skus) {
    //   style.skus = formatSkus(style.skus);
    //   }
    // }

    const styleList = await db.query(`SELECT s.style_id, s.name, s.sale_price, s.original_price, s.default_style AS "default?", \
    (SELECT jsonb_agg(p) AS photos FROM (SELECT photos.thumbnail_url, photos.url FROM photos WHERE photos.style_id = s.style_id) AS p), \
    jsonb_object_agg(skus.sku_id, (jsonb_build_object('quantity', skus.quantity, 'size', skus.size, 'sku_id', skus.sku_id))) AS skus FROM styles AS s LEFT JOIN skus \
    ON s.style_id = skus.style_id WHERE product_id = $1 GROUP BY s.style_id;`, [id]);

    // create a payload with a 'results' key. The client is looking for this 'results' property, the front-end will break without it
    const payload = {
      results: styleList.rows
    }

    res.status(200).send(payload);
  } catch (e) {
    console.log('products/:id/styles route error', e);
    res.sendStatus(500);
  }
})


// /products/:product_id/related
router.get('/:id/related', async (req, res) => {
  const { id } = req.params;

  try {
    const related = await db.query('SELECT array_agg(related.related_product_id) FROM related WHERE related.current_product_id = $1;', [id]);

    res.status(200).send(related.rows[0].array_agg);
  } catch (e) {
    console.log('products/:id/related route error', e);
    res.sendStatus(500);
  }
})

// export these routes to be used as middleware in server/index.js
module.exports = router;