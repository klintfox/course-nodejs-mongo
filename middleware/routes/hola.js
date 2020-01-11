const express = require('express');
const router = express.Router();

//rutas
router.get('/ingles', ( request, response, next )=>{
    response.locals.frase1 = "Hello";
    next();
}, (request , response, next)=>{
    response.locals.frase2 = response.locals.frase1 + " Mundo! ";
    next();
}, ( request, response, next )=>{
    response.send(response.locals.frase2);
});

module.exports = router;