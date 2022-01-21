'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Temperature extends Model {}

const define = (sequelize) => Temperature.init({
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
}, {
  sequelize,
  paranoid: true,
  modelName: `Temperature`,
  tableName: `temperatures`,
  timestamps: true,
  createdAt: true,
  updatedAt: false,
  deletedAt: false,
});

module.exports = define;
