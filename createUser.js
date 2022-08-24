'use strict'
const AWS = require('aws-sdk')

module.exports.createUsers = async (event) => {
    const body = JSON.parse(event.body);
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const putParams = {
        TableName: process.env.DYNAMODB_USER_TABLE,
        Item: {
            name: body.name,
            email: body.email,
            id:body.id
        }
    }
    const newUser= await dynamoDb.put(putParams).promise()
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "User is created successfully",
            user: newUser
        })
    }
}
