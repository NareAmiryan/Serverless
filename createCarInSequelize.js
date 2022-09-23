'use strict'

import AWS from 'aws-sdk';
//import { Sequelize } from 'sequelize';
import QueryTypes from 'sequelize';
 import {connect} from "./helper/dataConnection";
 //const carCreator = require("./models/car");

module.exports.seqCars = async (event) => {
    try {
        // const {Sequelize, sequelize} = await connect ();
        // const cars = carCreator(sequelize,Sequelize);
        // console.log(cars);


        const {cars} = await connect();
        console.log(cars);

        const {carId, userId, carName, carModel} = JSON.parse(event.body);
        console.log({
            cars_id: carId, user_id: userId, cars_name: carName, cars_model: carModel
        })

        // const seq = await des.query(
        //     "INSERT INTO cars(cars_id,user_id,cars_name,cars_model) VALUES (?,?,?,?);",
        //     {
        //         replacements: [carId,userId,carName,carModel],
        //         type: QueryTypes.INSERT
        //     }
        // );
        // console.log(seq);

        const carsParams = await cars.create({cars_id:carId,user_id: userId,cars_name: carName,cars_model: carModel});
        console.log(carsParams);
    }catch(err){
        console.log(err);
    }

};

// module.exports = seqCars;
