'use strict'

import * as pg from 'pg';
const AWS = require('aws-sdk');
import { Sequelize } from 'sequelize';
const { QueryTypes } = require('sequelize');
const {getResponse} = require("./utils/helpers");

let dbname=process.env.DB_NAME;
let username=process.env.DB_USER;
let password=process.env.DB_PASS;

module.exports.cars = async (event) => {
    const sequelize = new Sequelize(dbname, username, password, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectModule: pg
    });
    console.log(sequelize);

    const {carId,userId,carName,carModel}=JSON.parse(event.body);
    console.log({
        cars_id: carId,user_id:userId,cars_name:carName,cars_model:carModel
    })

    sequelize.authenticate().then(async () => {
        console.log("connected to DB!");

    }).catch((err) => {
        console.log(err);
    });


    const seq = await sequelize.query(
        "INSERT INTO cars(cars_id,user_id,cars_name,cars_model)",
        {
            // replacements: { cars_id: carId, user_id:userId,cars_name:carName, cars_model:carModel },
            replacements: [carId,userId,carName,carModel],
            type: QueryTypes.INSERT
        }
    );

    console.log(seq);

    //const text = "INSERT INTO public.cars(cars_id,user_id,cars_name,cars_model) VALUES(carId, userId,carName, carModel)"
    //const seq=await sequelize.query(text);

};
