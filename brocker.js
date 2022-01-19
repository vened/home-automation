const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;


aedes.on('client', function(client) {
  console.log('client connected', client.id);
});

aedes.published({ topic: '/devices/wb-ms_99/controls/Temperature', payload: 'I\'m broker ' + aedes.id }, 'localhost', (e) => {
  console.log(e);
});

aedes.on('publish', function(packet, client) {
  console.log('Client', client?.id);
  console.log('Published', packet);
  // console.log('Published', packet);
  // MqttListener.published(packet.topic, '3333', client);
});

server.listen(port, function () {
  console.log('server started and listening on port ', port);
});

