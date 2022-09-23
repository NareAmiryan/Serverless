'use strict'
const AWS = require('aws-sdk')

const getFromGSI = async () => {
    try {
    const params = {
        TableName: process.env.DYNAMODB_USER_TABLE,
        IndexName: "Email-index",
        KeyConditions:{
            "email":{
                "ComparisonOperator":"EQ",
                "AttributeValueList": [ 'nareamiryan@mail.ru' ]
            }
        },
        ProjectionExpression: "id"
    };

    const db = new AWS.DynamoDB.DocumentClient();

        console.log(params);
        const data = await db.query(params).promise();
        console.log(data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Success",
                user: data.Items
            })
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports=getFromGSI;
