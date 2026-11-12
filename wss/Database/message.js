const { default: mongoose } = require("mongoose");

const message = mongoose.Schema({
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
    },
},{ timestamps: true });

message.index({ conversationKey: 1, _id : -1 });

module.exports = {
    message
}