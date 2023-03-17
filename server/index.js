require('dotenv').config();
const express = require('express');
const products = require('./routes');
const port = process.env.SERVER_PORT || 8080;

const app = express();
app.use(express.json());

// use the routes defined in server/routes.js
app.use('/products', products);


app.listen(port, () => {
  console.log(`Server running and ready for connections on port ${port}`);
})