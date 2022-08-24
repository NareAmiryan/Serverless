'use strict'
//Create user in aws cognito
const AWS = require('aws-sdk');

const userPoolID = "us-east-1_2rkoRbPkQ"
module.exports.createUsers = async (event) => {
    const {name,email} = JSON.parse(event.body);
    const cognito = new AWS.CognitoIdentityServiceProvider({
        apiVersion: "2016-04-18",
    });
    const putParams = {
        UserPoolId: userPoolID,
        Username: email,
        UserAttributes:[
            {
                Name: 'name',
                Value: name
            },
            {
                Name: 'email',
                Value: email
            }
        ]
    };
    let response = await cognito.adminCreateUser(putParams).promise();
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "User is created successfully",
            user: response
        })
    };
}

/*
Create user in dynamo-db

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
}  */
