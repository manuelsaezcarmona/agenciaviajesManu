
// Este archivo sirve para configurar el servidor de express en  Node. Tomalo como analogia de express a configurar Apache en PHP.
// -----------------------------------------------------------------------------------
// Habilitar el servidor con la sintaxis commonJS.
//const express = require('express') 
// La manera moderna es realizarlo con imports y exports

import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:'variables.env'});

// creamos la app express
const app = express();

// Conectar la base de datos.

db.authenticate()
  .then(()=>console.log('base de datos conectada'))
  .catch(error => console.log(error));

// Definimos el puerto y el host  donde arranca el servidor
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

// Habilitar PUG - template para las vistas (seguimos el patron MVC) - esta es la V
app.set('view engine', 'pug');

// Obtener el año actual (middleware propio)
app.use( (req, res, next) =>{

  const anyo = new Date();
  res.locals.anyo = anyo.getFullYear();
  res.locals.nombresitio = "Viajes Manu"
  return next();
});

// Agregamos body parser (sirve para obtener valores de la pagina web)
app.use(express.urlencoded({extended: true}));

// definimos la carpeta publica. 
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// Start the Express server
app.listen(port, host, () => console.log(`Servidor ejecutandose en el puerto ${port}! y host ${host}`));





// -----------------------------------------------------------------------------------
// Codigo inicial de node para crear el servidor
// -----------------------------------------------------------------------------------
/** 
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Servidor funcionando en  http://${hostname}:${port}/`);
});
*/

