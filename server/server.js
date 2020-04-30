var env = process.env.NODE_ENV || 'development';
  console.log('env-*-*-*-*-*-*', env);

var {mongoose} = require('./db/mongoose');

  if(env === 'development'){
    process.env.PORT = 8080;
    mongoose.connect('mongodb://localhost:27017/temp-code');
  }

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb'); //for requiring the id

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT || 8080;

var app =  express();

app.use(bodyParser.json());

  app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);
  });
//------------------------------------------------------------------------------------------------------------------------//


// ----------Security and Authentication--------------//

  app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
      // res.send(user);
    }).then((token) => {
      res.header('x-auth', token).send(user); //'header('x-auth', )'-> we want to send back, x-auth-> creating a custom header.
    }).catch((e) => {
      res.status(400).send(e);
    })
  });

//--------Adding Private Express Routes----------//

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//--------Logging In Users-----------//

app.post('/users/login', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

//-----------Logging Out Users-------------//
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

  module.exports = {app};
