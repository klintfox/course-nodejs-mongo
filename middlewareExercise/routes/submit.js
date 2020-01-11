const express = require('express');
const router = express.Router();

// routes
/*
router.post('/', (request, response) =>{
    response.render('submit.ejs');
});*/

router.post('/', (request, response, next)=>{
    console.log('A');
    response.locals.name = request.body.nombre;
    response.locals.gender = request.body.genero;
    response.locals.country = request.body.pais;
    next();
},(request, response, next )=>{
    console.log('B');
    if( response.locals.name === '' || 
        response.locals.gender === '' || 
        response.locals.country === '') {
        next('Hay campos de texto vacios ');
    }else{
        console.log('C');
        // todos los campos de texto tiene información
        console.log('Ingresi al render');
        response.render('response.ejs',{
            profile : {
                name : response.locals.nombreVar,
                gender : response.locals.generoVar,
                country : response.locals.paisVar
            }
        });
    }
});

//midleware que maneja errores
router.use((err, request, response, next)=>{
    console.log('X');
    response.render('login.js',{
        error : err,
        profile : {
            name : response.locals.name,
            gender : response.locals.gender,
            country : response.locals.country
        }
    });
});

module.exports = router;