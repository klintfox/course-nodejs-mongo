const express = require('express');
const app = express();
const path = require('path');

//routes
app.get('/login',(request, response)=>{
    response.render('login.ejs');
});

app.listen(3000, ()=>{
    console.log('Listening at localhost 3000');
})