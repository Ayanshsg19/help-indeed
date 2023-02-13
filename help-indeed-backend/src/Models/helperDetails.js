const { DataTypes } = require("sequelize");

module.exports = (sequelizeInstance) => {
  const helper_details = sequelizeInstance.define("helper_details", {
    email_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
    },
    dob: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.INTEGER,
    },
    reg_date: {
      type: DataTypes.DATE,
    },
  });

  helper_details.belongsToMany(helper_details, {
    as: "user",
    foreignKey: "confidant",
    through: "trust_list",
  });

  helper_details.belongsToMany(helper_details, {
    as: "confidant",
    foreignKey: "user",
    through: "trust_list",
  });

  return helper_details;
};
