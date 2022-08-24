'use strict'
const AWS = require('aws-sdk')

module.exports.getUser = async (event) => {
    /////////////////// GetItem,get item in primary key
     console.log(event);
     const  { name }  = event.pathParameters;
        const params = {
        TableName: process.env.DYNAMODB_USER_TABLE,
        Key: {
            name: name
        }
        };

     const db = new AWS.DynamoDB.DocumentClient();
     try {
        console.log(params);
        const data=await db.get(params).promise();
        console.log(data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Success",
                user: data
            })
        }
    } catch (err) {
        console.log(err)
        return err
    }

    /////////////////// Query , get items with partition key
    // const  { name }  = event.pathParameters;
    // const params = {
    //     TableName: process.env.DYNAMODB_USER_TABLE,
    //     // Limit: 1,
    //     // ScanIndexForward: false,
    //     KeyConditions: {
    //         "name":{
    //             "ComparisonOperator":"EQ",
    //             "AttributeValueList": [ name ]
    //         }
    //     }
    // };
    // const db = new AWS.DynamoDB.DocumentClient();
    // try {
        // console.log(params);
        // //const data=await db.scan(params).promise(); // we can also get all items owing to method scan
        // const data =await db.query(params).promise();
        // console.log(data);
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({
        //         message: "Success",
        //         user: data.Items
        //     })
        // }
}


