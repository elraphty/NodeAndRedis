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

app.get('/user/add', (req, res) => {
  res.render('addusers');
});

// Search Processing
app.post('/user/search', (req, res, next) => {
  let id = req.body.id;

  client.hgetall(id, (err, obj) => {
    if(!obj) {
      res.render('searchusers', {
        error: 'User does not exists'
      });
    }else {
      obj.id = id;
      res.render('details', {
        user: obj
      });
    }
  }); 

});

app.post('/user/add', (req, res, next) => {
  let id = req.body.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;

  client.hmset(id, [
    'first_name', first_name,
    'last_name', last_name,
    'email', email,
    'phone', phone
  ], (err, reply) => {
    if(err) {
      console.log(err);
    }
    console.log(reply);
    res.redirect('/');
  });

});

app.delete('/user/delete/:id', (req, res) => {
  let id = req.params.id;
  client.del(id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});
