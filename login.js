'use strict'
const AWS = require('aws-sdk')

const userPoolID = "us-east-1_2rkoRbPkQ"
const clientID="60nfoimdh905l85mfjndrjka09"
module.exports.login = async (event) => {
    try {
        const cognito = new AWS.CognitoIdentityServiceProvider({
            apiVersion: "2016-04-18",
        });
        const {email, name, password} = JSON.parse(event.body);
        console.log(email);
        console.log(name);
        const params = {
            AuthFlow: "ADMIN_NO_SRP_AUTH",
            UserPoolId: userPoolID,
            ClientId: clientID,
            AuthParameters: {
                USERNAME: email,
                NAME: name,
                PASSWORD: password
            }
        }
        const response = await cognito.adminInitiateAuth(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Success",
                token: response.AuthenticationResult.IdToken
            })
        }
    }catch (err){
        console.log(err)
    }
}
