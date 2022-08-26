'use strict'
const AWS = require('aws-sdk')
const {getResponse} = require("./utils/helpers");



module.exports.car = async (event) => {
    try {
        const  { userId }  = event.pathParameters;

    } catch (err) {
        return getResponse({
            error: err.message
        },400)
    }
}
