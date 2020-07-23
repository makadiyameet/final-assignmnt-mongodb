require('dotenv').config();
const app = require('./app');
const debug = require('debug');
const http = require('http');
const https = require('https');
const fs = require('fs');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('securePort', port + 443);

const httpsOptions = {
    key: fs.readFileSync('assets/https/private.key'),
    cert: fs.readFileSync('assets/https/certificate.pem')
};

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log('Server listening on port', app.get('port'));
});

server.on('error', onError);
server.on('listening', onListening);

const secureServer = https.createServer(httpsOptions, app);
secureServer.listen(app.get('securePort'), () => {
  console.log('Server listening on port', app.get('securePort'));
});

secureServer.on('error', onError);
secureServer.on('listening', onListening);

function normalizePort(value) {
  var port = parseInt(value, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
