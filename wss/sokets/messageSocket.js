const { MESSAGES, CHATROOMS } = require("../Database/Models");

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
                sharedState.chatRooms.get(conversationKey).participants.forEach(user => {
                    const userId = user.toString();
                    if(sharedState.onlineUsers.has(userId)){
                        io.to(sharedState.onlineUsers.get(userId)).emit("new-message", data);
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
                chatRoom.participants.forEach(participant=>{
                    const userId = participant.toString();
                    if(sharedState.onlineUsers.has(userId)){
                        io.to(sharedState.onlineUsers.get(userId)).emit("new-message", data);
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