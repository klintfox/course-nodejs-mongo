const express = require('express');
const app = express();

//rutas
app.use('/animales', require('./routes/animales.js'));
app.use('/ciudades', require('./routes/ciudades.js'));
app.use('/alimentos', require('./routes/alimentos.js'));

app.get('*', ( request, response )=>{
    response.send('Error 404 página no encontrada');
});

app.listen(3000, ()=>{
    console.log('Listening at localhost port 3000');
});