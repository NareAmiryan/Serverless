'use strict'

const AWS = require('aws-sdk');
const {getResponse} = require("./utils/helpers");
const pg = require('pg');

const { DYNAMODB_CAR_TABLE } = process.env;

const cars = async (event) => {
    try {
        console.log(event);
        const body=JSON.parse(event.body)
        console.log(body);
        const username = event.requestContext?.authorizer?.claims?.['cognito:username'];

        const dynamoDb = new AWS.DynamoDB.DocumentClient();

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

module.exports= cars;

//{
//     "Version": "2012-10-17",
//     "Statement": [
//         {
//             "Effect": "Allow",
//             "Action": [
//                 "rds-db:connect"
//             ],
//             "Resource": [
//                 "arn:aws:rds-db:ap-southeast-2:xxxxxxxxx:dbuser:prx-0f9d9414be09b1c57/dev_rds_user"
//             ]
//         }
//     ]
// }
