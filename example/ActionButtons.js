'use strict';

function onButtonPress(trigger, action, timeToNextPress, timeOfLongPress){
    log.info("LongPress ActionButtons.onButtonPress")//Это лог. Он попадает в /var/log/messages
    var buttonPressedCounter = 0;
    var timerWaitNextShortPress = null;
    var timerLongPress = null;
    var isLongPress = false;

    var ruleName = "on_button_press_" + trigger.replace("/", "_");

    defineRule(ruleName, {
        whenChanged: trigger,
        then: function (newValue, devName, cellName) {
            log.info("LongPress defineRule")//Это лог. Он попадает в /var/log/messages

            // If button is pressed, wait for a long press
            if (newValue) {

                if (timerWaitNextShortPress) {
                    clearTimeout(timerWaitNextShortPress);
                }
                timerLongPress = setTimeout(function () {
                    if (typeof action.longPress === "object") {
                            if (typeof action.longPress.func === "function") {
                            action.longPress.func.apply(this, action.longPress.prop);
                        }
                    }
                    // log(">>>>>>> long press <<<<<<");
                    isLongPress = true;  // Long press identified, we will skip short press
                    buttonPressedCounter = 0;
                }, timeOfLongPress);

            }

            // If button is released, then it is not a "long press", start to count clicks
            else {
                if (!isLongPress) {
                    clearTimeout(timerLongPress);
                    buttonPressedCounter += 1;
                    timerWaitNextShortPress = setTimeout(function () {
                        switch (buttonPressedCounter) {
                            // Counter equals 1 - it's a single short press
                            case 1:
                                if (typeof action.singlePress === "object") {
                                    if (typeof action.singlePress.func === "function") {
                                        action.singlePress.func.apply(this, action.singlePress.prop);
                                    }
                                }
                                // log(">>>>>> short press - single <<<<<<");
                                break;
                            // Counter equals 2 - it's a double short press
                            case 2:
                                if (typeof action.doublePress === "object") {
                                    if (typeof action.doublePress.func === "function") {
                                        action.doublePress.func.apply(this, action.doublePress.prop);
                                    }
                                }
                                // log(">>>>>> short press - double <<<<<<");
                                break;
                        }
                        // Reset the counter
                        buttonPressedCounter = 0;
                    }, timeToNextPress);
                }

                // Catch button released after long press
                else {
                    if (typeof action.longRelease === "object") {
                        if (typeof action.longRelease.func === "function") {
                            if (typeof action.longRelease.prop === "array") {
                                action.longRelease.func.apply(this, action.longRelease.prop);
                            } else {
                                action.longRelease.func.apply(this, []);
                            }
                        }
                    }
                    isLongPress = false;
                }
            }

        }
    });
}

module.exports = { onButtonPress };
