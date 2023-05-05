

const mongoose = require('mongoose');


const connectToMongo = () => {
    if(mongoose.connect(process.env.mongoUrl)){
        console.log("Connect with mongo")
    }else{
        console.log('connection failed')
    }
}

module.exports = connectToMongo;