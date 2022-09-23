'use strict'
import AWS from 'aws-sdk';
const {getResponse} = require("./utils/helpers");

const {DYNAMODB_CAR_TABLE} = process.env;
const cars = async (event) => {
    try {
        console.log(event);
        const {userId} = event.pathParameters;
        console.log(userId);

        //const userId = event.requestContext?.authorizer?.claims?.["cognito:username"]
        //const authorizationHeader = event.headers.Authorization
        //
        //console.log(authorizationHeader);
        // const user = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        // console.log(`Hi ${name}`);
        // return getResponse({
        //     data: {
        //         message: `Hi ${name}`
        //     }
        // },200)


        const params = {
            TableName: DYNAMODB_CAR_TABLE,
            KeyConditions: {
                "userId": {
                    "ComparisonOperator": "EQ",
                    "AttributeValueList": [userId]
                }
            }
        };
            const db = new AWS.DynamoDB.DocumentClient();
            console.log(params);
            let data = await db.query(params).promise();
            data = data.Items.map(car => {
                return {
                    userId:car.userId,
                    carId:car.carId,
                    carName:car.carName,
                    carModel:car.carModel
                }
            })
            return getResponse({
                data
            }, 200)
        } catch (err) {
            return getResponse({
                error: err.message
            }, 400)
        }
    }

module.exports=cars

