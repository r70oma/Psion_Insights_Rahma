var mysql = require('mysql');
const express = require('express');
var app= express();
const bodyparser= require('body-parser');
const cors=require('cors');

//app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database:"test",
  multipleStatements: true

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(express.json());
app.use(cors());
app.listen(9000,()=>console.log("Express Server is running"));

// show all products
app.get('/Products', (req, res) => {
  con.query('SELECT * FROM product', (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});

// show spasific product by name
app.get('/Products/:id', (req, res) => {
  con.query('SELECT * FROM product Where id = ?',[req.params.id], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});

// delete a product by name
app.delete('/Products/:id', (req, res) => {
  con.query('DELETE FROM product Where id = ?',[req.params.id], (err,rows,fields) => {
      if (!err)
          res.send( "item deleted succesfully");
      else
          console.log(err);
  })
});
//Insert a product
app.post('/Products/add', (req, res) => {
  let emp= req.body;
  var sql = "SET @id = ?; SET @Name = ?; SET @Size = ?; SET @Color = ?; SET @price = ?;  SET @image = ?; \
  CALL productAddOrEdit(@id, @Name, @Size, @Color, @price, @image );";
  con.query(sql, [emp.id, emp.Name,emp.Size,emp.Color,emp.price,emp.image], (err, rows, fields) => {
      if (!err)
          rows.forEach(element => {
              if(element.constructor == Array)
              res.send('Inserted product id : '+element[0].id);
          });
      else
          console.log(err);
  })
});

//update product

app.put('/Products/update', (req, res) => {
  let emp= req.body;
  var sql = "SET @id = ?; SET @Name = ?; SET @Size = ?; SET @Color = ?; SET @price = ?;  SET @image = ?; \
  CALL productAddOrEdit(@id, @Name, @Size, @Color, @price, @image );";

  con.query(sql, [emp.id, emp.Name,emp.Size,emp.Color,emp.price,emp.image], (err, rows, fields) => {
      if (!err)
        
              res.send('product Updated Succesfully: ');
         
      else
          console.log(err);
  })
});

