const mongoose = require("mongoose");

const post = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    description : {
        type: String,
        required: true,
    },

    imgUrl : {
        type: String,
        required: true,
    }
});

const comment = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },

    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: true,
    },

    comment : {
        type: String,
        required: true,
    }
});

const like = new mongoose.Schema({

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: true,
    },

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }

});

module.exports = {
    post,
    comment,
    like
}