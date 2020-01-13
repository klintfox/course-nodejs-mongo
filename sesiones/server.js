const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);

// configurar ejs - plantillas html
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// configurar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// conexion bd mongo
mongoose.connect(
  "mongodb+srv://root:mongodb" +
    "@pruebasnode-yhubm.gcp.mongodb.net/profiles" +
    "?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//conexión fallida
mongoose.connection.on("error", function(err) {
  console.log("Error con la conexión a la BD");
});

// conexión realizada
mongoose.connection.once("open", function() {
    console.log("Success");
  });

//configurar esqhema 
let customSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
});

//configurar modelo
let custoModel = mongoose.model('login', customSchema);

//configurar session store 
let store = new MongoDBStore({
    "mongodb+srv://root:mongodb" +
    "@pruebasnode-yhubm.gcp.mongodb.net/profiles" +
    "?retryWrites=true&w=majority", 
    collection : 'misSesiones'
});

// en caso no se grabe la sesión
store.on('error', function(err){
        console.log(err);
});

//configurar sesiones
app.use(session({
    secret : 'usando nodejs',
    store: store,
    resave : true,
    saveUninitialized : true
}));


//routes
app.get('/login',(request, response)=>{
    response.render('login.ejs');
});

app.post('/login', ( request, response)=>{
    //guardando información del formulario
    let varemail = request.body.useremail;
    let varpassword = request.body.userpassword;

    //verificar que el password y correo son válidos
    custoModel.findOne({
        email : varemail,
        password : varpassword
    }, function(err, doc){
        if(err){
            console.log(err);
            response.render('login.ejs',{
                error : 'Problemas con la base de datos'
            });
        }

        if(doc === null){
            console.log('El password y correo no se válidos ');
            response.render('login.ejs',{
                error : 'El password y correo no son válidos',
                profile : {
                    email : varemail,
                    password : varpassword
                }
            });
        }

        if(doc !== null ){
            console.log('El password y correo son válidos');
            //varibales de sesión
            request.session.clave = doc._id;
            request.session.name = doc.username;
            request.session.email = doc.password;
            request.session.password = doc.password;
            response.redirect('/dashboard');
        }
    });
});

app.get('/dashboard', (request, response)=>{
    if(!request.session.clave){
        response.send('<h3> Debes <a href="/login">iniciar sesión</a> para ver la página </h3>');
    }else{
        response.render('dashboard.ejs',{
            profile : {
                id: request.session.clave,
                name : request.session.name,
                email : request.session.email,
                password : request.session.password
            }
        });
    }
});

app.get('logout', (request, response)=>{
    request.session.destroy(function(err){
        response.redirect('/login');
    });
});

app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
})