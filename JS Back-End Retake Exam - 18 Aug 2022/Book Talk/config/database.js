const mongoose = require('mongoose')

const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/book-talk'


///async because we will use database
module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected on book-talk');
    } catch (error) {
        console.error(error.message);
        //procces.exit(1) - stop application
        process.exit(1)
    }

}