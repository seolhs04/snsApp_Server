const express = require('express');
const app = express();
const PORT = 5000;

const path = require('path')
const fs = require('fs');

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    db(null, './public/images')
  },
  filename: function(req,file,cb){
    cb(null, file.originalname)
  }
});
var upload = multer({storage : storage})


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


app.get('/postData.json', function(req,res){
  db.query('SELECT * FROM post', function(err,result){
    if(err) throw err;
    res.json(result)
  })
})

app.post('/create_process', function(req,res){
  console.log(req.body)
  // db.query(`INSERT INTO post (title,description,created) VALUES('${req.body.title}','${req.body.description}',NOW())`, function(err,result){
  //   if(err) throw err;
    
  //   console.log('데이터 저장 성공!')
  //   res.redirect('/')
  // });
})

app.post('/update_process', function(req,res){
  db.query(`UPDATE post SET title='${req.body.title}', description='${req.body.description}' WHERE id='${req.body.id}'`, function(err,result){
    if(err) throw err;
    
    console.log('데이터 수정 성공!')
    res.redirect('/')
  });
})

app.post('/delete_process', function(req,res){
  db.query(`DELETE FROM post WHERE id =${req.body.id}`, function(err,result){
    if(err) throw err;
    
    console.log('데이터 삭제 성공!')
    res.redirect('/')
  });
})

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`)
})