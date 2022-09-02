'use strict'
const AWS = require('aws-sdk')
const {getResponse} = require("./utils/helpers");


module.exports.cars = async (event) => {
    try {
        console.log(event);
        const username = event.requestContext?.authorizer?.claims?.["name"]
        const authorizationHeader = event.headers.Authorization

        console.log(authorizationHeader);
        // const user = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        // console.log(`Hi ${name}`);
        // return getResponse({
        //     data: {
        //         message: `Hi ${name}`
        //     }
        // },200)
        /////////////////////////////////Loading...
        const params = {
            TableName: process.env.DYNAMODB_CAR_TABLE,
            KeyConditions: {
                "username": {
                    "ComparisonOperator": "EQ",
                    "AttributeValueList": [username]
                }
            }
        };
        const db = new AWS.DynamoDB.DocumentClient();
            console.log(params);
            const data = await db.scan(params).promise();
            console.log(data);

        } catch (err) {
            return getResponse({
                error: err.message
            }, 400)
        }
    }

