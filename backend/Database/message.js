const { default: mongoose } = require("mongoose");

const messsage = mongoose.Schema({
    conversationKey : {
        type : String,
        required : true
    },
    sender : {
        type : String,
        required : true
    },
    message: {
        type : String,
        required : true
    }
},{ timestamps: true });

module.exports = {
    messsage
}