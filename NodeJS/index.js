
//  Módulos Externos
const server    = require( './config/server.js' );
const port      = 3000;

server.listen( port, () => {
    console.log(`Server is listening on port ${port}`);
} );