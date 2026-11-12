const { USERS, CHATROOMS } = require("../Database/Models.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


async function getConversationKey(req, res){
    try{

        const {

            token,
            otherUserId,

        } = req.body;

        const data = jwt.verify(token,process.env.JWT_SECRET);
        const userEmail = data.userEmail;

        const userId = await USERS
            .findOne({
                userEmail: userEmail,
            })
            .select("_id");
        console.log("userid : " + typeof otherUserId)

        const conversationKey = [userId._id.toString(), otherUserId.toString()].sort().join("_");

        const isConversationExist = await CHATROOMS.findOne({
            conversationKey : conversationKey
        });

        if(!isConversationExist){
            const newChatRoom = await CHATROOMS.create({
                participants : [userId._id, otherUserId].sort(),
                conversationKey : conversationKey
            })
        }

        return res.status(201).json({
            conversationKey: conversationKey,
        })


    }catch(err){

        console.log("Error from the get-connection-key : "+err);
        return res.status(500).json({
            message: "internal server Error : " + err
        })

    }
    res.status(200).json({
        message: "request reach successfull some error in the logic"
    });
}

async function getConversations(req, res){
    try{

        console.log("MongoDB readyState:", mongoose.connection.readyState);

        const token = req.headers.token;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data)
        let userId = await USERS
            .findOne({
                userEmail: data.userEmail,
            })
            .select("_id");

        userId = userId._id;
        const conversations = await CHATROOMS
            .find({
                participants: userId,
            })
            .sort({
                lastMessageTime : -1,
            })
            .populate("participants", "_id userName userProfileImg");

        let cleanedConversations = null;
        if(conversations){
            cleanedConversations = conversations.map(({participants, ...conversation})=>({
                conversationKey : conversation._doc.conversationKey,
                lastMessageTime : conversation._doc.lastMessageTime,
                otherUser: (participants[0].equals(userId))? participants[1] : participants[0],
            }));
        }
        console.log(cleanedConversations);
        return res.status(200).json({
            conversations: cleanedConversations,
        })

    }catch(err){
        console.log("Error in the getConversation page of getConversations : " + err);
        return res.status(500).json({
            message: "Error in the getConversation page of getConversations : " + err,
        })
    }
}

module.exports = {
    getConversationKey,
    getConversations,
}