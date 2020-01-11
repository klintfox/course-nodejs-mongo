const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//configurar plantillas html
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configurar servidor estatico
app.use(express.static(path.join(__dirname, 'static')));

// configura body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes
app.use('/input', require('./routes/input.js'));

//default error
app.get('*', ( request, response) =>{
    response.send("Error 404 página no encontrada");
})

//port
app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
})