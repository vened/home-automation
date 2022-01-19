const { connect } = require('async-mqtt');
// const MQTT_ADDR = 'mqtt://192.168.31.236';
const MQTT_ADDR = 'mqtt://127.0.0.1';
const client = connect(MQTT_ADDR, { clientId: 'webClient111', keeplive: 1, clean: false, debug: false });

const MQTT_TOPIC4 = 'aedes/hello';

const doStuff = async () => {
  try {
    console.log('co')
    await client.subscribe(MQTT_TOPIC4);
    await client.publish("wow/so/cool", "It!");
    // await client.end();
  } catch (e){
    console.log(e);
    process.exit();
  }

  // client.on('message', function (topic, message) {
    // console.log('===>', topic, message.toString());
  // });
}

client.on("connect", doStuff);
