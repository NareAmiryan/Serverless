'use strict'

import * as pg from 'pg';
import { Sequelize } from 'sequelize';

let dbname = process.env.DB_NAME;
let username = process.env.DB_USER;
let password = process.env.DB_PASS;

module.exports.connect = async () => {
    const sequelize = new Sequelize(dbname, username, password, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectModule: pg
    });

    sequelize.authenticate().then(async () => {
        console.log("connected to DB!");
        await sequelize.sync({force: true});

    }).catch((err) => {
        console.log(err);
    });
    return sequelize;
}

