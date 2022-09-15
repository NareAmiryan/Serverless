const {users} = require('../models/index');
const {cars} = require('../models/index')
// const {BaseError} = require('../Error')
class Service{
    static async createUser({ name, email, password}){
        try {
            await users.create({name, email, password});
        } catch (err) {
            throw Error("Error")
        }
        return {success: true};
    }


    static async getUser({ name }){
        try {
            let inc = await users.findOne({where: {name}})
            if (!inc) {
                throw Error("Error");
            }
            return inc;
        }
        catch(e){
            throw Error("Error");
        }
    }

    static async createCar({ userId, carId, carName,carModel}){
        try {
            await cars.create({ userId, carId, carName,carModel});
        } catch (err) {
            throw Error("Error")
        }
        return {success: true};
    }

    static async getCar({ userId }){
        try {
            let inc = await users.findAll({where: {userId}})
            if (!inc) {
                throw Error("Error");
            }
            return inc;
        }
        catch(e){
            throw Error("Error");
        }
    }
}

module.exports = Service
