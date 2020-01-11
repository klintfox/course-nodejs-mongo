const express = node.require('express');
const app = express();
const path = node.require('path');
const  bodyParser = node.require('body-parser');

//servidor estatico
app.use(express.static(path.join(__dirname,'static')));

// body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//ruta
app.get('/input',( request, response) =>{
    response.sendFile(path.join(__dirname,'views/input.html'));
});

app.post('/input', ( request, response )=>{
    response.send('<div> Nombre: '+ request.body.username +
       ' <br> Género: '+ request.body.usergender +
       ' <br> País: '+ request.body.usercountry + 
       ' </div>');
});

//en caso no exista la pagina 404
app.get('*',( request, response)=>{
    response.send('Error 404 page not found');
});

//port
app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
})