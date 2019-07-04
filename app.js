//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();

const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

//console.log(process.env.SECRET);


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true});




var userSchema = new mongoose.Schema({

email : String,
password : String

});




const User = new mongoose.model("User",userSchema);



app.get("/",function(req,res){

res.render("home");

});


app.get("/login",function(req,res){

res.render("login");

});

app.get("/register",function(req,res){

res.render("register");

});

app.post("/register",function(req,res){


  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    let newUser = new User({

    email : req.body.username,
    password : hash

    });

    newUser.save(function(err){

    if(err){

      console.log(err);
    }else{

      res.render("secrets");
    }

    });

  });





});


app.post("/login",function(req,res){




const username = req.body.username;
const password = req.body.password;

User.findOne({"email" : username},function(err,result){

if(err){
  console.log(err);
}else{
  if(result){

    bcrypt.compare(password, result.password, function(err, result1) {

      if (result1 === true){
        res.render("secrets");
      }
});



  }
}

});




});








app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
