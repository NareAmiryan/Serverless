'use strict'

//import * as pg from 'pg';
const AWS = require('aws-sdk');
//import { Sequelize } from 'sequelize';
const { QueryTypes } = require('sequelize');
const {getResponse} = require("./utils/helpers");
const {connect}=require("./helper/dataConnection");
const {cars}=require("./models/car");

module.exports.cars = async (event) => {
    const des = await connect();

    const {carId,userId,carName,carModel}=JSON.parse(event.body);
    console.log({
        cars_id: carId,user_id:userId,cars_name:carName,cars_model:carModel
    })

    const seq = await des.query(
        "INSERT INTO cars(cars_id,user_id,cars_name,cars_model) VALUES (?,?,?,?);",
        {
            // replacements: { cars_id: carId, user_id:userId,cars_name:carName, cars_model:carModel },
            replacements: [carId,userId,carName,carModel],
            type: QueryTypes.INSERT
        }
    );

    console.log(seq);

   // const carsParams = await cars.create({carId,userId,carName,carModel});
   //  console.log(carsParams);

};
