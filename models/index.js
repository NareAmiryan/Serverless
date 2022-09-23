'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import config1 from '../config/config.json';
const config = config1[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

    // console.log("creating a model");
    // const carCreator = require("./car");
    // const model = carCreator(sequelize, Sequelize.DataTypes);
    // db[model.name] = model

    console.log("creating a model");
    const folder = require("./");
    fs.readdirSync(folder).forEach(file => {
        const carCreator = require("./"+ file);
        const model = carCreator(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    })

// fs
//     .readdirSync(__dirname)
//     .filter(file => {
//         console.log('file is ' + file);
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//         console.log("creating a model");
//         // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//         // const carCreator = require('./'+ file);
//         // const model = carCreator(sequelize, Sequelize.DataTypes);
//
//         const model = require('./'+ file)(sequelize, Sequelize.DataTypes);
//         db[model.name] = model;
//     });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db};
