
const getResponse = (body, statusCode) => {
    const {data = {}, error = '' , ...otherParams} = body

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
            ...config,
            ...otherParams
        }
    }

    return {
        statusCode,
        body: JSON.stringify({
            data: data
        }),
        ...config,
        ...otherParams
    }

};

module.exports = {
    getResponse
};
