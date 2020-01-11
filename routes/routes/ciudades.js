const express = require('express');
const router = express();

// rutas
router.get('/newyork', ( request, response)=>{
    response.send('Quieres saber sobre new York');
});

router.get('/tokyo', ( request, response)=>{
    response.send('Quieres saber sobre tokyo ');
});


module.exports = router;