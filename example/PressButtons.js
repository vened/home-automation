const { onButtonPress } = require('./ActionButtons');

/**
 * Helper Functions
 */
function switchRelay(device, control) { //Принимает в параметрах устройство и выход. Переключает состояние выхода на противоположное.
    log.info('LongPress switchRelay', device, control);//Это лог. Он попадает в /var/log/messages
    dev[device][control] = !dev[device + '/' + control];
}

onButtonPress(
    'wb-gpio/EXT1_DR9',          //Вход, за которым следим.
    {
        singlePress: {
            func: switchRelay,
            prop: ['MR6CU-41', 'K1'],
        },
        doublePress: {
            func: switchRelay,
            prop: ['MR6CU-41', 'K5'],
            //func: switchDimmerRGB,
            //prop: ["wb-mr6c_10", "K2", "wb-mrgbw-d_24"]
        },
        longPress: {
            func: switchRelay, prop: ['MR6CU-41', 'K1'],
            //func: setRandomRGB,
            //prop: ["wb-mr6c_10", "K2", "wb-mrgbw-d_24"]
        },
    },
    300, 1000,
);
