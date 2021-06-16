const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    static associate(models) {
      // Associations...
    }
  }

  Source.init({
      state: {
        type: DataTypes.STRING(2),
        allowNull: false
      },

      url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
    sequelize,
    modelName: 'Source',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  });

  return Source;
};