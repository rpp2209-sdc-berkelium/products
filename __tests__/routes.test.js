// tests for server routes
require('dotenv').config();
const axios = require('axios');

// fetches data using the local development API for use in testing
const testFetch = async (url, params = {}) => {

  const data = await axios.get(url, {
    baseURL: `http://localhost:${process.env.SERVER_PORT}`,
    'params': params
  })

  return data.data;
}

// iterates through collections to ensure data is of the expected type. requires a callback for determining data type
const collectionWalker = (collection, callback) => {

  if (Array.isArray(collection) === true) {
    for (var item of collection) {
      if (!callback(item)) {
        return false;
      }
    }
    return true;
  } else if (typeof collection === 'object') {
    for (var prop in collection) {
      if (!callabck(prop)) {
        return false;
      }
    }
    return true;
  }
}

describe('/products route unit tests', () => {

  test('requests to /products should return an array', async () => {
    expect(Array.isArray(await testFetch('/products'))).toEqual(true);
  })

  test('requests to /products should return an array of objects', async () => {
    expect(collectionWalker((await testFetch('/products?count=1')), (item) => typeof item === 'object')).toEqual(true);
  })

  test('requests to /products should return 1 page of 5 results by default', async () => {
    expect((await testFetch('/products')).length).toEqual(5);
    expect((await testFetch('/products'))[0].id).toEqual(1);
  })

  test('requests to /products that use the "page" and "count" url params should return appropriate results', async () => {
    expect((await testFetch('/products?count=50')).length).toEqual(50);
    expect((await testFetch('/products?page=5&count=10'))[0].id).toEqual(41);
  })
})

describe('/products/:id route unit tests', () => {

  test('requests to /products/:id should return an object', async () => {
    expect(typeof (await testFetch('/products/3000'))).toEqual('object');
  })

  test('requests to /products/:id should return an object with a matching id property (the correct product)', async () => {
    expect((await testFetch('/products/8000')).id).toEqual(8000);
  })

  test('responses from /products/:id should have a "features" property', async () => {
    expect((await testFetch('/products/5432')).features).toBeDefined();
  })

  test('the features property should be an array of objects', async () => {
    expect(Array.isArray((await testFetch('/products/9000')).features)).toEqual(true);
    expect(collectionWalker((await testFetch('/products/6666')).features, (item) => typeof item === 'object')).toEqual(true);
  })
})

describe('/products/:id/styles route unit tests', () => {

  test('requests to /products/:id/styles should return an array of objects', async () => {
    expect(Array.isArray(await testFetch('/products/8080/styles'))).toEqual(true);
    expect(collectionWalker((await testFetch('/products/8080/styles')), (item) => typeof item === 'object')).toEqual(true);
  })

  test('responses from /products/:id/styles should have a "photos" property', async () => {
    expect((await testFetch('/products/5432/styles'))[0].photos).toBeDefined();
  })

  test('the photos property should be an array of objects', async () => {
    expect(Array.isArray((await testFetch('/products/8080/styles'))[0].photos)).toEqual(true);
    expect(collectionWalker((await testFetch('/products/8080/styles'))[0].photos, (item) => typeof item === 'object')).toEqual(true);
  })

  test('responses from /products/:id/styles should have a "skus" property', async () => {
    expect((await testFetch('/products/5432/styles'))[0].skus).toBeDefined();
  })

  test('the skus property should be an object', async () => {
    expect(typeof (await testFetch('/products/5432/styles'))[0].skus).toEqual('object');
  })
})

describe('/products/:id/related route unit tests', () => {

  test('requests to /products/:id/related should return an array', async () => {
    expect(Array.isArray(await testFetch('/products/8080/related'))).toEqual(true);
  })

  test('requests to /products/:id/related should return an array of integers', async () => {
    expect(collectionWalker((await testFetch('/products/8080/related')), (item) => typeof item === 'number')).toEqual(true);
  })
})