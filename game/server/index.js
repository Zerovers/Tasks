const express = require('express');
const graphQL = require('express-graphql');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const schema = require('../schema/schema');

const app = express();
const PORT = 3005;

app.use('/graphql', graphQL({
  schema,
  graphiql: true,
}));

const url = 'mongodb+srv://Zerover:iNKWMg4IFuHCoOn4@cluster0-hncsa.mongodb.net/mydb';
const dbName = 'mydb';

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.listen(PORT, err => (err ? console.log(err) : console.log('server started!')));
