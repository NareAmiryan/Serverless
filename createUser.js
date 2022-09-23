'use strict'
//Create user in aws cognito
const AWS = require('aws-sdk');

const userPoolID = "us-east-1_2rkoRbPkQ"
 const createUsers = async (event) => {
    try {
        const {name, email,password} = JSON.parse(event.body);
        console.log(event);
        console.log(email);
        console.log(name);
        const cognito = new AWS.CognitoIdentityServiceProvider({
            apiVersion: "2016-04-18",
        });
        const putParams = {
            UserPoolId: userPoolID,
            Username: email,
            UserAttributes: [
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
        if(response){
            const paramsForSetPass = {
                Password: password,
                UserPoolId: userPoolID,
                Username: email,
                Permanent: true
            };
            await cognito.adminSetUserPassword(paramsForSetPass).promise()
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User is created successfully",
                user: response
            })
        };
    } catch (err){
        console.log(err);
    }
}

module.exports = createUsers;
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
