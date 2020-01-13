const express = require("express");
const mongoose = require("mongoose");
const passport = require ('passport');
const localStrategy = require('passport-local').Strategy;
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require("path");

// conexion bd mongo
mongoose.connect(
    "mongodb+srv://root:mongodb" +
      "@pruebasnode-yhubm.gcp.mongodb.net/profiles" +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.connection.on("error", function(err) {
    console.log("Error con la conexión a la BD");
  });
  
  mongoose.connection.once("open", function() {
    console.log("Success");
  });

//configurar esquema 
let customSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
});

//configurar modelo
let custoModel = mongoose.model('login', customSchema);

//verificar si el usuario y password son correctos  en bd -> cb : callback
passport.use(new localStrategy(
    function (username, password, cb){
        custoModel.findOne({
            username = username,
            password = password 
        }, function (err, doc ){
            if(err){
                return cb(err);
            }
            if(doc === null){
                return cb(null, false); //error null y doc false
            }
            if(doc !== null){
                return cb(null, doc); //error null y doc 
            }
        });
    }
));

//serialización - pasar el id de usuario de una página a otra para
//comprobar que el usuario inicio sesión
passport.serializeUser(function (user, cb){
    cb(null, user._id); //paso el identificador de una página a otra
});

//deserialización 
passport.deserializeUser(function(id, cb){
    custoModel.findOne({
        _id: id
    }, function (err, doc){
        if(err){
            return cb(err);
        }else{
            return cb(null, doc); //no hay error y se manda doc
        }
    });
});

// configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configurar sesiones
app.use(session({
    secret : 'hola mundo',
    resave : true,
    saveUninitialized : true
}));

// configurar ejs - plantillas html
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//
app.use(passport.initialize())
app.use(passport.session());


//routes
app.get('/login',(request, response)=>{
    response.render('login.ejs');
});

app.post('/login', (request, response, next)=>{
    passport.authenticate('local', 
    function(err, user, info){
        if(err){
            return next(err);
        }

        if(!user){
            return response.render('login.ejs',{
                warning : 'El usuario y password son incorrectos'
            });

        }
        //en caso el usuario y contraseña sean correctos
        request.login(user, function(err){
            return response.redirect('/dashboard');
        });
    })(request, response);
});

app.get('/dashboard', (request, response)=>{
    //verificamos si el usuario ha iniciado sesión
    if(request.user){
        response.render('dashboard.ejs', {
            profile : {
                username : request.user._id,
                name : request.username,
                email : request.email,
                password : request.password
            }
        });
    }else{
        response.send('<h3>Debes <a href="login">iniciar sesión</a> para ingresar a esta opción</h3>');
    }
});

app.get('logout', (request, response)=>{
    request.logout();
    response.redirect('/login');
    
});

app.listen(3000, () => {
    console.log("Listening at localhost 3000");
});
