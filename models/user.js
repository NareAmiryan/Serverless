const { Sequelize,Model , DataTypes } = require('sequelize')

module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define("users", {
        userId: {
            type: DataTypes.number,
            allowNull: false,
            primaryKey:true
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
    })
    return users
};
