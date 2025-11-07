const mongo = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongo.connect(process.env.MONGO_URI);
        console.log('MongoDB Connect: successfully')
    } catch (error) {
        console.log('Error: ', error)
    }
}


module.exports = connectDB;