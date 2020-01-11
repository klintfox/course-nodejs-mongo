const express = require('express');
const router = express();

// rutas
router.get('/manzana', ( request, response)=>{
    response.send('Quieres saber sobre manzanas');
});

router.get('/naranja', ( request, response)=>{
    response.send('Quieres saber sobre naranjas ');
});


module.exports = router;