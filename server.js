const express = require('express');
const app = express();
const PORT = 5000;

const path = require('path')

const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
  host     : process.env.db_host,
  user     : process.env.db_user,
  password : process.env.db_pw,
  database : 'sns_app'
});

db.connect();

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname + '/../client/build')))

app.use(express.json());
app.use(express.urlencoded( {extended : false} ))


app.get('/data.json', function(req,res){
  res.json({"result" : "hi"})
})

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`)
})