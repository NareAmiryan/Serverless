'use strict';

const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello,your application executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports=hello;
