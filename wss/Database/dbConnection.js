const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>{
        console.log("MongoDB connected");
    })
    .catch((err)=>{
        console.log("Error in DB connection : "+ err);
    })
}
module.exports = connectDB;