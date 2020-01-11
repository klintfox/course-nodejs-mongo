const express = require('express');
const router = express();

// rutas
router.get('/tortuga', ( request, response)=>{
    response.send('Quieres saber sobre tortuga');
});

router.get('/gato', ( request, response)=>{
    response.send('Quieres saber sobre gatos ');
});


module.exports = router;