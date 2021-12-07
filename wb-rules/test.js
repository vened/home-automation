log.info(11111111)

var inputIlluminance = "wb-ms_99/Illuminance";

function buzzleEnable(value){
  if(value < 10){
    // dev["buzzer"]["enabled"] = true;
    // dev["wb-gpio"]["EXT1_R3A1"] = true;
    // return false;
  }
  // dev["buzzer"]["enabled"] = false;
  // dev["wb-gpio"]["EXT1_R3A1"] = false;
  // return false;
}

defineRule("wd-14_in_14", {
  whenChanged: inputIlluminance,
  then: function (newValue, devName, cellName) {
    if(newValue < 10){
      // dev["buzzer"]["enabled"] = true;
//      dev["wb-gpio"]["EXT1_R3A1"] = true;
      return;
    }

    // dev["buzzer"]["enabled"] = false;
//    dev["wb-gpio"]["EXT1_R3A1"] = false;
    return;
  }
});

var inputIn14 = "wb-gpio/EXT1_R3A1";

defineRule("EXT2_IN14", {
  whenChanged: inputIn14,
  then: function (newValue, devName, cellName) {
    log('-----')
    log(devName, newValue)
    // if(newValue < 10){
    //   dev["buzzer"]["enabled"] = true;
//      dev["wb-gpio"]["EXT1_R3A1"] = true;
//       return;
//     }

    // dev["buzzer"]["enabled"] = false;
//    dev["wb-gpio"]["EXT1_R3A1"] = false;
//     return;
  }
});


defineVirtualDevice("wb-1", {
  title: "Отопление",
  cells: {
    "Температура": {
    type: "range",
    max: 240,
    value: 20,
    },
    "Вкл.": {
    type: "pushbutton",
    value: false,
    }
  }
});


