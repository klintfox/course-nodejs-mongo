const express = require('express');
const router = express.Router();

//router
router.get('/', (request, response) =>{
    response.render('login.ejs');
});

module.exports = router;