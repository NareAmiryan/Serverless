const { Sequelize,Model , DataTypes } = require('sequelize')

module.exports = function (sequelize, DataTypes) {
    const cars = sequelize.define("cars", {
        carId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey:true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carModel:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return cars
};
