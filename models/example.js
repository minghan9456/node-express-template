const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  /**
   * CustomerModel class.
   */
  class CustomerModel extends Sequelize.Model {}

  CustomerModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING(127),
        allowNull: false,
        unique: 'uniqueIdx',
      },
      password: {
        type: DataTypes.STRING(127),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'customer',
      timestamps: false,
      freezeTableName: true,
    }
  );

  CustomerModel.beforeCreate(async (user, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    user.name = user.name.toLowerCase();
  });

  CustomerModel.beforeBulkUpdate(async ({ attributes }) => {
    if (attributes.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(attributes.password, salt);
      attributes.password = hash;
    }
  });

  return CustomerModel;
};
