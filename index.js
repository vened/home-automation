const { connect } = require('mqtt');
const MQTT_ADDR = 'mqtt://192.168.31.236';
const client = connect(MQTT_ADDR, { clientId: 'webClient', keeplive: 1, clean: false, debug: false });

const MQTT_TOPIC = '/devices/wb-gpio/controls/EXT1_IN14';
const MQTT_TOPIC1 = '/devices/wb-gpio/controls/EXT2_R3A1';
const MQTT_TOPIC2 = '/devices/wb-ms_99/controls/External Sensor 1';
const MQTT_TOPIC3 = '/devices/wb-ms_99/controls/Illuminance';
const MQTT_TOPIC4 = '/devices/wb-ms_99/controls/Temperature';

client.on('connect', function () {
  // client.subscribe(MQTT_TOPIC);
  // client.subscribe(MQTT_TOPIC1);
  // client.subscribe(MQTT_TOPIC2);
  // client.subscribe(MQTT_TOPIC3);
  // client.subscribe(MQTT_TOPIC4);
  // client.subscribe('/devices/0x00158d000410b4f3/controls/humidity');
  // client.subscribe('/devices/wb-ms_99/controls/Air Quality (VOC)');
  // client.subscribe('/devices/wb-gpio/controls/EXT2_R3A1');
  // client.publish(MQTT_TOPIC, '3');
  // client.end()
});

// console.log(client);

// client.on('/devices/wb-ms_99/controls/Illuminance', function (topic, message) {
//   console.log(topic)
//   console.log(message.toString())
// })
// client.on('/devices/wb-ms_99/controls/Temperature', function (topic, message) {
//   console.log(message.toString())
// })

var timerLongPress = null;
var isLongPress = false;
client.on('message', function (topic, message) {
  // message is Buffer
  // console.log('===>', topic, message.toString());

  if (topic === '/devices/wb-gpio/controls/EXT2_R3A1') {
    console.log('========>>>>>', topic, message.toString());
    // console.log(topic, message.toString());
    // console.log('<<<<<=========');
  }

  if (topic === MQTT_TOPIC) {
    // console.log('----------->>>>>', topic, message.toString());
    if (message.toString() == 1) {
      timerLongPress = setTimeout(function () { // Длинное нажатие приводит к отключению всего света
        if (isLongPress) {
          client.publish('/devices/wb-gpio/controls/EXT2_R3A1', '0', { qos: 2 });
          isLongPress = false;
          return;
        }
        client.publish('/devices/wb-gpio/controls/EXT2_R3A1', '1', { qos: 2 });
        isLongPress = true;
        timerLongPress = null;
      }, 100);
    }
    if (message.toString() == 0) {
      if (timerLongPress) {
        clearTimeout(timerLongPress);
      }
    }
  }
});
client.on('error', function () {
  console.log('ERROR');
});
client.on('offline', function () {
  console.log('offline');
});
client.on('reconnect', function () {
  console.log('reconnect');
});
