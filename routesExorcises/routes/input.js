const express = require('express');
const router = express.Router();

// rutas
router.get('/', ( request, response)=>{
    response.render('formulario.ejs');
});

router.post('/', ( request, response)=>{
    let userVar = request.body.nombre;
    let genderVar = request.body.genero;
    let countryVar = request.body.pais;

    response.render('respuesta.ejs',{
        profile : {
            name : userVar,
            gender: genderVar,
            country : countryVar
        }
    });
    //console.log(profile);
});
module.exports = router;