var VOCsensor = 'wb-ms_99/Air Quality (VOC)';

defineRule("wd-14_in_14", {
  whenChanged: VOCsensor,
  then: function (newValue, devName, cellName) {
    log(newValue)
    if (newValue > 50) {
      log(33333);
      // dev["wb-gpio"]["EXT2_R3A1"] = false;
      return;
    }
    // dev["wb-gpio"]["EXT2_R3A1"] = false;
  }
});

// log.info(11111111)
//
// var inputIlluminance = "wb-ms_99/Illuminance";
//
// function buzzleEnable(value){
//   if(value < 10){
//     // dev["buzzer"]["enabled"] = true;
//     // dev["wb-gpio"]["EXT1_R3A1"] = true;
//     // return false;
//   }
//   // dev["buzzer"]["enabled"] = false;
//   // dev["wb-gpio"]["EXT1_R3A1"] = false;
//   // return false;
// }
//
// defineRule("wd-14_in_14", {
//   whenChanged: inputIlluminance,
//   then: function (newValue, devName, cellName) {
//     if(newValue < 10){
//       // dev["buzzer"]["enabled"] = true;
// //      dev["wb-gpio"]["EXT1_R3A1"] = true;
//       return;
//     }
//
//     // dev["buzzer"]["enabled"] = false;
// //    dev["wb-gpio"]["EXT1_R3A1"] = false;
//     return;
//   }
// });
//
// // var inputIn14 = "wb-gpio/EXT1_R3A1";
//
// defineVirtualDevice("wb-1", {
//   title: "Отопление",
//   cells: {
//     "Температура": {
//     type: "range",
//     max: 240,
//     value: 20,
//     },
//     "Вкл.": {
//     type: "pushbutton",
//     value: false,
//     }
//   }
// });
defineVirtualDevice("light-1", {
  title: "Освещение",
  cells: {
    "Вкл.": {
      type: "switch",
      value: false,
    }
  }
});
