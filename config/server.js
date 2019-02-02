// Bibliotecas
const express   = require('express');
const consign   = require('consign');
const bodyParser= require('body-parser');

//  Variables
const server    = express();

server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

//  Links dentro da Aplicação
consign()
    .include('./config/firebaseConfig.js')
    .include('./app/routes')
    .into(server)

module.exports  = server;

// //  Operations
// server.get( '/', ( req, res ) => {
//     res.send('Recebido');
// } );

// server.get( '/users', ( req, res ) => {
//     res.send('Joao, Adriano, Vitor');
// } );

// server.listen( port, () => {
//     console.log(`Server is listening on port ${port}`);
// } );