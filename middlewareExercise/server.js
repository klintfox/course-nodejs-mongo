const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


// configurar template engige
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// servidor estatico
app.use(express.static(path.join(__dirname, 'static')));

// configurar body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// routes
app.use('/login', require('./routes/login.js'));
app.use('/submit', require('./routes/submit.js'));

app.get('*', (request, response)=>{
    response.send('Error 404 page not found');
});

// port
app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
});