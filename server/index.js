require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 8080;
const db = require('../db')
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running and ready for connections on port ${port}`);
})