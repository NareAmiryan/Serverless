'use strict'

const AWS = require('aws-sdk');
const {getResponse} = require("./utils/helpers");

const { DYNAMODB_CAR_TABLE } = process.env;

module.exports.cars = async (event) => {
        console.log(event);
        const body=JSON.parse(event.body)
        console.log(body);
        const username = event.requestContext?.authorizer?.claims?.['cognito:username'];
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        try {
        const putParams = {
            TableName: DYNAMODB_CAR_TABLE,
            Item: {
                userId: username,
                carId: body.carId,
                carName: body.carName,
                carModel:body.carModel
            }
        }
        const newCar = await dynamoDb.put(putParams).promise();
        console.log(newCar);

        return getResponse({
            data:{
                message: "Car is created successfully",
                userId: username,
                carId: body.carId,
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
