var inputIn14 = "wb-gpio/EXT1_IN14";
var rele1 = "wb-gpio/EXT2_R3A1";
var timerLongPress = null;


defineRule("EXT1_IN14", {
  whenChanged: inputIn14,
  then: function (newValue, devName, cellName) {
    log('------------')
    log(devName, cellName,  newValue)

    if (newValue) {
      timerLongPress = setTimeout(function () { // Длинное нажатие приводит к отключению всего света
        log('dev["wb-gpio"]["EXT2_R3A1"]', dev["wb-gpio"]["EXT2_R3A1"]);
        log(dev["light-1"]["Вкл."]);
        // dev["buzzer"]["enabled"] = !dev["buzzer"]["enabled"];
        dev["wb-gpio"]["EXT2_R3A1"] = !dev["wb-gpio"]["EXT2_R3A1"];
        timerLongPress = null;
      }, 2000);
    }

    if (!newValue) {
      if (timerLongPress) {
        clearTimeout(timerLongPress)
      }
    }

  }
});


defineRule('light-rule-1', {
  whenChanged: 'light-1/Вкл.',
  then: function (newValue, devName, cellName) {
    dev["wb-gpio"]["EXT2_R3A1"] = newValue;
  }
});
