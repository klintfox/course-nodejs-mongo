const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//configurar plantillas html
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//configurar body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json);

//servidor statico
app.use(express.static(path.join(__dirname,'static')))

// rutas
app.get('/input', ( request, response )=>{
    response.render('input.ejs');
});

app.post('/input', ( request, response )=>{
    //guardando información 
    let nombreVar = request.body.nombre;
    let generoVar = request.body.genero;
    let paisVar = request.body.pais;

    console.log(nombreVar);
    console.log(generoVar);
    console.log(paisVar);

    response.render('response.ejs',{
        profile:{
            name : nombreVar,
            gender: generoVar,
            country : paisVar
        }
    })



});

app.get('*',( request, response )=>{
    response.send('Error 404 no existe la página');
})

app.listen(3000, ()=>{
    console.log('Listening 3000');
})