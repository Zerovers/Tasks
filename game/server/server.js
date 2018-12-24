const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

let app = Express();

const url = 'mongodb+srv://Zerover:iNKWMg4IFuHCoOn4@cluster0-hncsa.mongodb.net/mydb';
const dbName = "mydb";

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept');
  next();
})

let collection;
app.get('/', (req, res) => {
  console.log(req.query);
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
    collection = client.db(dbName).collection("test");
    collection.find({}).toArray((error, data) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      console.log(data);
      res.send(data);
      client.close();
    });
  });
 
  
});

app.listen(3000, () => console.log('Work'));

// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//   if (err) {
//     console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
//   }
//   console.log('Работает');
//   const collection = db.db("mydb").collection("test");
//   collection.find().toArray((err, item) => {
//     console.log(item);
//   });
//   db.close();
// });
