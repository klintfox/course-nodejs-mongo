const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// configurar ejs
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
mongoose.connection.on("error", function(err) {
  console.log("Error con la conexión a la BD");
});

mongoose.connection.once("open", function() {
  console.log("Success");
});

// esquema
let customSchema = new mongoose.Schema({
  username: String,
  gender: String,
  country: String
});

// modelo
let customModel = mongoose.model("user", customSchema);

// outes
app.get("/login", (request, response) => {
  response.render("login.ejs");
});

// save model
app.post("/submit", (request, response) => {
  let varname = request.body.username;
  let vargender = request.body.usergender;
  let varcountry = request.body.usercountry;

  //guardando información
  let newDocument = new customModel({
    username: varname,
    gender: vargender,
    country: varcountry
  });

  newDocument.save(function(err, document) {
    if (err) {
      console.log("No se pudo guardar");
      response.send("Errro problemas al  guardar la información");
    } else {
      console.log("Éxito: los datos se guardaron");
      response.send("Éxito: se añadió un documento a MongoDb");
    }
  });
});

// listar items
app.get("/allitems", (request, response) => {
  customModel.find({}, function(err, documentos) {
    if (err) {
      console.log("Error: no se obtuvieron documentos");
      response.render("allitems.ejs", {
        error: "No se obtuvieron documentos"
      });
    } else {
      console.log("Se obtuvo información");
      response.render("allitems.ejs", {
        results: documentos
      });
    }
  });
});

app.get("/genero", (request, response) => {
  response.render("genero.ejs");
});

app.post("/filtro", (request, response) => {
      let vargender = request.body.usergender;
      //buscando en base de datos
      customModel.find({gender : vargender}, function(err, documentos){
        if (err) {
            console.log(err);
            response.render('filtro.ejs', {
              error : 'Hubo problemas con la búsqueda'
            });
        } else {
            console.log('Exito la búsqueda fue exitosa');
            response.render("filtro.ejs", {
                results : documentos,
                gender : vargender
            });
        }
      });
});

app.get('/actualizar-pais', (request, response)=>{  
      response.render('actualizar.ejs');
});

app.post('/actualizar', (request , response)=>{
    //guardo información en variables
    let varname = request.body.username;
    let newcountry = request.body.usercountry;

    //actualizando información en BD
    customModel.updateOne({
        username : varname
    }, {
        country : newcountry
    }, function(err, result){
        if(err){
            console.log(err);
            response.render('resultado.ejs',{
                error : 'No se pudo actualizar'
            });
        }
        
        if (err !== null){
          console.log('Éxito, la actualización es correcta');
          response.render('resultado.ejs',{
              exito : 'El país se actualizó correctamente'
          });
        }
    });
})

app.get('/delete', ( request, response )=>{
  response.render('delete.ejs');
});

app.post('/delete', ( request , response)=>{
    let varusername = request.body.username;
    let vargender = request.body.usergender;

    //borrando documento de la base de datos
    customModel.deleteOne({
        username : varusername,
        gender : vargender
    }, function(err){
        if(err){
            console.log('Error al eliminar un usuario');
            response.render('deleteresult.ejs',{
                error : 'No se pudo eliminar el usuario'
            });
        }else{
            console.log('Éxito, se eliminó el documento');
            response.render('deleteresult.ejs',{
                error : 'El documento se ha eliminado'
            });
        }
    });
});

app.listen(3000, () => {
  console.log("Listening at localhost 3000");
});
