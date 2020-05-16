'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    id: DataTypes.STRING,
    img_url: DataTypes.STRING,
    target_url: DataTypes.STRING
  }, {});
  Ad.associate = function(models) {
    // associations can be defined here
  };
  return Ad;
};