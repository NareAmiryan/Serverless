
const getResponse = (body, statusCode) => {
    const {data = {}, error = ''} = body

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    }

    if(statusCode !== 200){
        return {
            statusCode,
            body: JSON.stringify({
                error
            }),
            ...config
        }
    }

    return {
        statusCode,
        body: JSON.stringify(data),
        ...config
    }

};

module.exports = {
    getResponse
};
