'use strict'

const AWS = require('aws-sdk');
const {getResponse} = require("./utils/helpers");

module.exports.cars = async (event) => {
    try {
        const username = event.requestContext?.authorizer?.claims?.['cognito:username']
        const body = JSON.parse(event.body);
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const putParams = {
            TableName: process.env.DYNAMODB_CAR_TABLE,
            Item: {
                userId:username,
                carID: body.carID,
                carName: body.carName,
                carModel:body.carModel
            }
        }
        const newCar = await dynamoDb.put(putParams).promise();
        console.log(newCar);

        return getResponse({
            data:{
                message: "Car is created successfully",
                carID: body.carID,
                carName: body.carName,
                carModel:body.carModel
            }
        },200)

    } catch (err){
        return getResponse({
            error: err.message
        },400)
    }
}
