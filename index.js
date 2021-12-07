const mqtt = require('mqtt')
const MQTT_ADDR = 'mqtt://192.168.31.201';
const client  = mqtt.connect(MQTT_ADDR,{clientId: "webClient", keeplive: 1, clean: false, debug:false});

const MQTT_TOPIC = '/devices/wb-gpio/controls/EXT2_IN14'
// const MQTT_TOPIC = '/devices/wb-ms_99/controls/External Sensor 1'
// const MQTT_TOPIC = '/devices/wb-ms_99/controls/Illuminance'
// const MQTT_TOPIC = '/devices/wb-ms_99/controls/Temperature'

client.on('connect', function () {
  client.subscribe(MQTT_TOPIC);
  client.subscribe('/devices/wb-gpio/controls/EXT1_R3A1');
  // client.publish(MQTT_TOPIC, '3');
  // client.end()
})

// console.log(client);

// client.on('/devices/wb-ms_99/controls/Illuminance', function (topic, message) {
//   console.log(topic)
//   console.log(message.toString())
// })
// client.on('/devices/wb-ms_99/controls/Temperature', function (topic, message) {
//   console.log(message.toString())
// })
client.on('message', function (topic, message) {
  // message is Buffer

  if(topic === MQTT_TOPIC){
    console.log('-----------');
    console.log(topic);
    console.log(message.toString());
    if(message.toString() == 1){
      client.publish('/devices/wb-gpio/controls/EXT1_R3A1', '1', {qos: 2, retain: true});
    }
    if(message.toString() == 0){
      client.publish('/devices/wb-gpio/controls/EXT1_R3A1', '0', {qos: 2, retain: true});
    }

  }
  // client.end();
});
client.on('error', function(){
  console.log("ERROR")
})
client.on('offline', function() {
  console.log("offline");
});
client.on('reconnect', function() {
  console.log("reconnect");
});
