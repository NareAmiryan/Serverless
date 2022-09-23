module.exports = function (sequelize, DataTypes) {
    const cars = sequelize.define("cars", {
        cars_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey:true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cars_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cars_model:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return cars
};

