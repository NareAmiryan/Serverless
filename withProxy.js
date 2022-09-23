const { Client } = require('pg')

const createCarInSQL = async (event) => {
    try{
    console.log(event);
    const {carId,userId,carName,carModel} = JSON.parse(event.body);
    console.log(carId,userId,carName,carModel);

    console.log({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    })
    const client = new Client({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    })
        console.log('Connecting to database')
        const resp = await client.connect()

        console.log('Quering the database');
        console.log(resp);
         const text = "INSERT INTO public.cars(cars_id,user_id,cars_name,cars_model) VALUES($1, $2, $3, $4)"
        const values=[carId,userId,carName,carModel];
        const res = await client.query(text,values)
        console.log(res.rows[0]);
    } catch (error) {
        console.error(error)
    }
    // } finally {
    //     console.log('Closing database connection')
    //     await client.end()
    // }

    console.log({
        success: "true"
    });
}

module.exports=createCarInSQL;
