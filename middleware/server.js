const express = require('express');
const app = express();

//rutas
app.use('/hola', require('./routes/hola.js'));

// port
app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
});