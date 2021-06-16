const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      // Associations...
    }
  }

  Schedule.init({
      state: {
        type: DataTypes.STRING(2),
        allowNull: false
      },

      from_age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      to_age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      starts_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },

      ends_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
    sequelize,
    modelName: 'Schedule',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  });

  return Schedule;
};