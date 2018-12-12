const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');
const methodOverride = require('method-override');

// Create Client For Redis
let client = redis.createClient();
client.on('connect', () => {
  console.log('Connected to redis');
});

// SET PORT
const PORT = process.env.PORT || 5000;
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('searchusers');
});

// Search Processing
app.post('/user/search', () => {

});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});
