// Раздел для размещения правил управления освещением


virtTotalBlackout = require("shortLongDoublePress").shortLongDoublePress( // Кнопка в Прихожей
	"Virtual Total Blackout",
	"wb-gpio/A3_OUT",
	300,
	2000,
	function() {
		dev["wb-gpio/A4_OUT"] = !dev["wb-gpio/A4_OUT"];
		return },  // "Длительное нажатие"
	function() { return },  // "Двойное нажатие" - Ничего
	function() { return }    // "Одиночное нажатие" - Ничего
);


log("added in 02_illuminance.js");
