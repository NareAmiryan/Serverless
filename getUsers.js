'use strict'
const AWS = require('aws-sdk')
//Pagination
const getUsers = async (event) => {
    try {
    console.log(event);
    const  { startKey, limit = 5, name }  = event.queryStringParameters;
    const db = new AWS.DynamoDB.DocumentClient();

        let queryParams = {
            TableName: process.env.DYNAMODB_USER_TABLE,
            Limit: limit
        };

        if(startKey){
            console.log(startKey);
            queryParams.ExclusiveStartKey = JSON.parse(startKey);
        }
        if (name){
            queryParams.KeyConditions = {
                "name":{
                    "ComparisonOperator":"EQ",
                    "AttributeValueList": [ name ]
                }
            };
            const items = await db.query(queryParams).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Success",
                    data: items
                })
            }
        } else {
            const items = await db.scan(queryParams).promise();
            console.log(items);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Success",
                    data: items
                })
            }
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports=getUsers;
