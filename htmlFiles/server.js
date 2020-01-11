const express = require('express');
const app = express();
const path = require('path');

//servidor estatico
app.use(express.static(path.join(__dirname,'static')));

//ruta
app.get('/hello',( request, response) =>{
    response.sendfile(path.join(__dirname,'views/hello.html'));
});

//en caso no exista la pagina 404
app.get('*',( request, response)=>{
    response.send('Error 404 page not found');
});

//port
app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
})