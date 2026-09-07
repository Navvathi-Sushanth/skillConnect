const { default: mongoose, model } = require("mongoose");

const {
        user,
        connection,
        request,
        skill,
        otherDetails,
        chatRoom,
} = require("./User");

const {
        post,
        comment,
        like
} = require("./postShema");

const USERS = mongoose.model("Users",user);

const CONNECTIONS = mongoose.model("Connections",connection);

const REQUESTS = mongoose.model("Requests", request);

const EXPERTS = mongoose.model("Experts", skill);

const LEARNS = mongoose.model("Learns", skill);

const POSTS = mongoose.model("Posts",post);

const COMMENTS = mongoose.model("Comments",comment);

const LIKES = mongoose.model("Likes", like);

const DETAILS = mongoose.model("Details",otherDetails);

const CHATROOMS = mongoose.model("ChatRooms",chatRoom);

module.exports = {
        USERS,
        CONNECTIONS,
        REQUESTS,
        EXPERTS,
        LEARNS,
        POSTS,
        COMMENTS,
        LIKES,
        DETAILS,
        CHATROOMS,
};