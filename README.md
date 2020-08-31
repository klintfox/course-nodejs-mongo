# Ejercicios con Nodejs y Mongodb 

### Comandos 
- Inicializar
    ```sh 
    npm init 
    ```
- Instalar dependencias
    ```sh
    npm install --save express 
    ```

### Hello World
- Implementar en server.js el siguinte código
    ```sh
    const express = require('express');
    const app = express();

    app.get('/hello', ( request, response )=>{
        response.send('Hello World');
    });

    app.listen(3000, ()=>{
        console.log('Listening at localhost 3000');
    })
    ```
- Ejecutar Server
    ```sh
    node server.js 
    ```
###  Configurar servidor Estatico
- crear nuevo folder
- crear htmlFiles
- crear htmlForms
- Express para configurar el servidor
- Body-parse permite procesar los formularios
    ```sh
    npm install --save express body-parser
    ```
### Complementos
- Instalar body-parser
    ```sh
    npm install --save express body-parser ejs
    ```
### node MongoDB
- Instalar dependencias
    ```sh
    npm install express body-parser ejs mongoose
    ```
- Sesiones
    ```sh
    npm install --save express ejs body-parser mongoose express-session
    ```
- Guardar sesiones en la base de datos
    ```sh
    npm install --save connect -mongodb-session
    ```
- Dependecia passport
    ```sh 
    npm install --save passport passport-local express ejs body-parser express-session mongoose
    ```
