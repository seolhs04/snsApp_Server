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

const fileUpload = require('express-fileupload');
app.use(fileUpload());

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
  db.query(`INSERT INTO post (title,description,created) VALUES('${req.body.title}','${req.body.description}',NOW())`, function(err,result){
    if(err) throw err;
    
    uploadImg = req.files.img
    uploadImg.mv(`${__dirname}/public/images/${req.files.img.name}`, function(err){
      if(err) console.log(err)

      console.log('데이터 저장 성공!')
      res.redirect('/')
    })
  });
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

app.get('/images/:img', function(req,res){
  res.sendFile(path.join(__dirname + '/public/images/' + req.params.img))
})

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`)
})