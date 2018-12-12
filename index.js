const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');
const methodOverride = require('method-override');

// SET PORT
const PORT = process.env.PORT || 5000;
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});
