'use strict'
const AWS = require('aws-sdk')

module.exports.getUser = async (event) => {
    //const {startKey} = event.queryParameters;
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
        //const data = await db.get(params).promise();
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

    //console.log(event);
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
    // console.log(event);
    // const  { name }  = event.pathParameters;
    // const  { startKey, limit = 5 }  = event.queryStringParameters;
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
        // let result=[];
        // let queryParams = {
        //         TableName: process.env.DYNAMODB_USER_TABLE,
        //         Limit: limit,
        //         KeyConditions: {
        //             "name":{
        //                 "ComparisonOperator":"EQ",
        //                 "AttributeValueList": [ name ]
        //             }
        //         },
        //     };

        // if(startKey){
        //     queryParams.ExclusiveStartKey = JSON.parse(startKey);
        //     const items = await db.query(queryParams).promise();
        //     items.Items.forEach(item => result.push(item));
        //     return {
        //         statusCode: 200,
        //         body: JSON.stringify({
        //             message: "Success",
        //             user: result,
        //             length:result.length
        //         })
        //     }
        // } else {
        //     return {
        //         statusCode: 200,
        //         body: JSON.stringify({
        //             message: "No more items to be retrieved"
        //         })
        //     }
        // }

         // do {
         //     items = await db.query(queryParams).promise();
         //     items.Items.forEach(item => result.push(item))
         //     queryParams.ExclusiveStartKey = items.LastEvaluatedKey;
         // }while(typeof items.LastEvaluatedKey !== 'undefined')


        // return{
        //         statusCode: 200,
        //         body: JSON.stringify({
        //             message: "Success",
        //             user: items
        //         })
        // }
        // let items;
        // let result=[];
        // do {
        //     items = await db.query(queryParams).promise();
        //     items.Items.forEach((item) => result.push(item));
        //     queryParams.ExclusiveStartKey = items.LastEvaluatedKey;
        // } while (typeof items.LastEvaluatedKey !== 'undefined');
        // console.log("result", result);
        // console.info("Available count size:", result.length);
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({
        //         message: "Success",
        //         user: result,
        //         length:result.length
        //     })
        // }


        ///////// The Second
        //     let result, accumulated,ExclusiveStartKey
        //
        //     do {
        //         result = await db.query({
        //             TableName: process.env.DYNAMODB_USER_TABLE,
        //             ExclusiveStartKey,
        //             Limit: 4,
        //             KeyConditions: {
        //                 "name":{
        //                     "ComparisonOperator":"EQ",
        //                     "AttributeValueList": [ name ]
        //                             }
        //             }
        //         }).promise();
        //
        //         ExclusiveStartKey = result.LastEvaluatedKey;
        //         accumulated = [...accumulated, ...result.Items];
        //     } while (result.Items.length || result.LastEvaluatedKey);
        //
        // return {
        //         statusCode: 200,
        //         body: JSON.stringify({
        //             message: "Success",
        //             user: result,
        //             accumulated:accumulated
        //             })
        //         }
    // } catch (err) {
    //     console.log(err)
    //     return err
    // }
}


