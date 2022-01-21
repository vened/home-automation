// TODO эта хрень коннектится к серверу где развернут дополнительный брокер от моего wb
// брокер на сервер настроен по инструкции https://wirenboard.com/wiki/index.php/MQTT#%D0%A0%D0%B0%D0%B1%D0%BE%D1%82%D0%B0_%D1%81_%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8_MQTT_%D1%81_%D0%B2%D0%BD%D0%B5%D1%88%D0%BD%D0%B5%D0%B3%D0%BE_%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0
const { connect } = require('mqtt');
const { sequelize, Temperature } = require(`./services/sequelize`);


// const MQTT_ADDR = 'mqtt://192.168.31.236';
const MQTT_ADDR = 'mqtt://176.112.203.65';
const client = connect(MQTT_ADDR, {
  username: 'test',
  password: 'wbpassword',
  clientId: 'webClient',
  keeplive: 1,
  clean: false,
  debug: false,
});

const MQTT_TOPIC = '/devices/wb-gpio/controls/EXT1_IN14';
const MQTT_TOPIC1 = '/devices/wb-gpio/controls/EXT2_R3A1';
const MQTT_TOPIC2 = '/devices/wb-ms_99/controls/External Sensor 1';
const MQTT_TOPIC3 = '/devices/wb-ms_99/controls/Illuminance';
const MQTT_TOPIC4 = '/devices/wb-ms_99/controls/Temperature';

client.on('connect', function () {
  // client.subscribe('aedes/hello');
  client.subscribe(MQTT_TOPIC);
  client.subscribe(MQTT_TOPIC1);
  client.subscribe(MQTT_TOPIC2);
  client.subscribe(MQTT_TOPIC3);
  client.subscribe(MQTT_TOPIC4);
  client.subscribe('/devices/0x00158d000410b4f3/controls/humidity');
  client.subscribe('/devices/wb-ms_99/controls/Air Quality (VOC)');
  client.subscribe('/devices/wb-gpio/controls/EXT2_R3A1');
  // client.publish(MQTT_TOPIC1, '0', { qos: 2 });
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
client.on('message', async function (topic, message) {
  // message is Buffer
  // console.log('===>', topic, message.toString());

  if (topic === '/devices/wb-ms_99/controls/External Sensor 1') {
    console.log('========>>>>>', topic, message.toString());
    // console.log(topic, message.toString());
    // console.log('<<<<<=========');

    await sequelize.sync({ force: false });
    await Temperature.create({ value: message.toString() });
    // async function PgConnect() {
    // try {
    //   await sequelize.authenticate();
    //   console.log(`Соединение с сервером установлено!`);
    // } catch (err) {
    //   console.error(`Не удалось установить соединение по причине: ${err}`);
    // }

    // await sequelize.sync({ force: false });
    //
    // await Temperature.create({ value: message.toString() });
    // }

    // PgConnect();
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
      }, 1000);
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
