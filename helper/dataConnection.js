'use strict'
import { db } from '../models/index';
const connect = async () => {
    console.log('connecting ... ');
    try {
        await db.sequelize.authenticate();
        console.log("connected to DB!");
        await db.sequelize.sync({force: true});
        return db;
    }catch (err){
        console.error(err);
        throw err;
    }
}

export {connect};

