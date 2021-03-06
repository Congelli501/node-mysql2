const net = require('net');
const { EventEmitter } = require('events');

const Connection = require('./connection');
const ConnectionConfig = require('./connection_config');

// TODO: inherit Server from net.Server
class Server extends EventEmitter {
  constructor() {
    super();
    this.connections = [];
    this._server = net.createServer(this._handleConnection.bind(this));
  }

  _handleConnection(socket) {
    const connectionConfig = new ConnectionConfig({
      stream: socket,
      isServer: true
    });
    const connection = new Connection({ config: connectionConfig });
    this.emit('connection', connection);
  }

  listen(port, host, backlog, callback) {
    this._port = port;
    this._server.listen.apply(this._server, arguments);
    return this;
  }

  close(cb) {
    this._server.close(cb);
  }
}

module.exports = Server;
