'use strict';

const defineTemperature = require(`./Temperature`);

const define = (sequelize) => {
  const Temperature = defineTemperature(sequelize);

  return { Temperature };
};

module.exports = define;
