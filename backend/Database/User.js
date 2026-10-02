const mongoose = require("mongoose");

const user = new mongoose.Schema({

    userName : {
        type: String,
        required: true,
        unique: true,
    },

    userEmail: {
        type: String,
        unique: true,
        required: true,
    },

    userPassword: {
        type: String,
        required: true,
    },

    userPIN : {
        type: String,
        required: true,
    },

    userProfileImg : {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
    },
    
});


const singUpUser = mongoose.Schema({

    userName : {
        type: String,
        required: true,
    },

    userEmail: {
        type: String,
        required: true,
    },

    userPassword: {
        type: String,
        required: true,
    },

    userPIN : {
        type: String,
        required: true,
    },

    isUserVerified : {
        type: Boolean,
        defalut: false,
    },

    verificationTokenExpireAt: {
        type: Date,
        default: null,
    }

},{
    timestamps: true,
})


const connection = new mongoose.Schema({

    followersId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    followingId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

});


const request = new mongoose.Schema({

    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    receiver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    status : {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
});

request.index(
    { sender:1, receiver:1},
    { unique: true}
)

const skill = new mongoose.Schema({

    userId :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }, 
    
    skill : {
        type: String,
        required : true
    },

});

const otherDetails = mongoose.Schema({
    userId :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }, 
    
    userDepartment : {
        type: String,
        default: "Add your department",
    },

    userYear : {
        type: String,
        default: "Add your year",
    },

    userPhone : {
        type: String,
        default: "Add your phone number",
    },

    userLocation : {
        type: String,
        default: "Add your location",
    },

    userCollege : {
        type: String,
        default: "Add your college",
    },

    userAbout : {
        type: String,
        default: "Tell others a little about yourself...",
    }

});

const chatRoom = mongoose.Schema({

    participants : [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Users",
            required: true,
        }
    ],

    conversationKey: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },

    lastMessageTime : {
        type: Date,
        default: Date.now,
        index: true,
    }
    
}, {
    timestamps: true
});

const message = mongoose.Schema({

    roomId: {
        type: String,
        required: true,
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    message: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
})

const otp = mongoose.Schema({

    otp: {
        type: String,
        required: true,
    },

    userEmail: {
        type: String,
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true,
    }

},{
    timestamps: true,
})

module.exports = {
    user,
    singUpUser,
    connection,
    request,
    skill,
    otherDetails,
    chatRoom,
    message,
    otp,
}