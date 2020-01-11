const express = require('express');
const app = express();

//ruta
app.get('/hello', ( request, response )=>{
    response.send('Hello World');
});

//port
app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
})