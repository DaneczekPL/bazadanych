const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://DaneczekPL:123@zadanie-db.wevsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express();
let db;
let studentCollection;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db('zadanie-db')
    studentCollection = db.collection('studenci')
  })
  .catch(console.error)



app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  
  db.collection('studenci').find().toArray()
    .then(results => {
      res.render('index.ejs', { studenci: results})
    })
    .catch(error => console.error(error))
})

app.use(bodyParser.urlencoded({ extended: true }))


app.post('/studenci', (req, res) => {

  studentCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
      console.log(result)
    })
    .catch(error => console.error(error))
})
app.listen(3000, function () {
  console.log('listening on 3000')
})



