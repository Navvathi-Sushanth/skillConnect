const { MESSAGES, CHATROOMS, USERS } = require("../Database/Models");

async function getDetails() {
    try{

        const user = await USERS
            .findOne({
                _id: sender,
            })
            .select("_id userName userProfileImg");

        const {
            userName,
            userProfileImg
        } = user;

        return ({
            userName,
            userProfileImg
        });

    }catch(err){
        console.log("Error from the getDetail in the messageSocket : " + err);
    }
}

function messageSocket(io, socket, sharedState){

    socket.on("message",async (data)=>{
        try{

            const {
                conversationKey,
                message,
                sender
            } = data;

            if(sharedState.chatRooms.has(conversationKey)){
                console.log( sharedState.chatRooms.get(conversationKey))
                const {
                    userName,
                    userProfileImg
                } = getDetails(sender);
                const newData = {
                    ...data,
                    userName,
                    userProfileImg
                }
                sharedState.chatRooms.get(conversationKey).participants.forEach(user => {
                    const userId = user.toString();
                    
                    if(sharedState.onlineUsers.has(userId)){
                        io.to(sharedState.onlineUsers.get(userId)).emit("new-message", newData);
                    }
                });
            }
            else {

                if(conversationKey==null){
                    return;
                }

                const chatRoom = await CHATROOMS
                    .findOne({
                        conversationKey: conversationKey,
                    })
                    .lean();
                console.log("chatRoom : " + conversationKey);
                const {
                    userName,
                    userProfileImg
                } = getDetails(sender);
                const newData = {
                    ...data,
                    userName,
                    userProfileImg

                }
                chatRoom.participants.forEach(participant=>{

                    const userId = participant.toString();
                    if(sharedState.onlineUsers.has(userId)){
                        io.to(sharedState.onlineUsers.get(userId)).emit("new-message", newData);
                    }
                });
                
            }

            const newMessage = await MESSAGES.create(data);


        }catch(err){
            console.log("Error from the messageSocket : " + err);
        }
    });
    
}

module.exports = {
    messageSocket
}