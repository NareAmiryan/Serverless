'use strict'
const AWS = require('aws-sdk');
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';

const {getResponse} = require("./utils/helpers");


const userPoolID = "us-east-1_2rkoRbPkQ"
const clientID="60nfoimdh905l85mfjndrjka09"
module.exports.xxx = async (event) => {
    // try {
    //     const cognito = new AWS.CognitoIdentityServiceProvider({
    //         apiVersion: "2016-04-18",
    //     });
    //     const {email, name, password} = JSON.parse(event.body);
    //     console.log(email);
    //     console.log(name);
    //     const params = {
    //         AuthFlow: "ADMIN_NO_SRP_AUTH",
    //         UserPoolId: userPoolID,
    //         ClientId: clientID,
    //         AuthParameters: {
    //             USERNAME: email,
    //             NAME: name,
    //             PASSWORD: password
    //         }
    //     }
    //     const response = await cognito.adminInitiateAuth(params).promise();
    //     console.log(response)
    //     console.log(response.AuthenticationResult.IdToken);
    //     return getResponse(response,200)
    //
    // } catch (err){
    //     console.log(err)
    //     return getResponse({
    //         error: err.message
    //     },400)
    // }

    try{
        const {email, password} = JSON.parse(event.body);
        Amplify.configure({
            // OPTIONAL - if your API requires authentication
            Auth: {
                // REQUIRED - Amazon Cognito Region
                region: 'us-east-1',
                // OPTIONAL - Amazon Cognito User Pool ID
                userPoolId: userPoolID,
                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolWebClientId: clientID,
            }
        })

        const user = await Auth.signIn(email, password);
        console.log(user);
        const token = Auth.currentSession().then(user => console.log(user.getIdToken().getJwtToken()))
        return getResponse({
            data: token
        } ,200)
    } catch (err) {
            return getResponse({
                error: err.message
            },400)
    }
}
