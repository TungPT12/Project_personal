const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@mongodb.y8qiteb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectMongoose = (callback) => {
    mongoose.connect(uri).then(() => {
        console.log("Mongo Connected!")
        callback();
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = connectMongoose;