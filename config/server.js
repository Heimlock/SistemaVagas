// Bibliotecas
const express   = require('express');
const consign   = require('consign');
const bodyParser= require('body-parser');

//  Vars
const server    = express();

server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

    consign()
        .include('./app')
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