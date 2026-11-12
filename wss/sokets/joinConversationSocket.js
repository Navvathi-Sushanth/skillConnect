const { CHATROOMS } = require("../Database/Models");

function joinConversationSocket(socket, sharedState){
    socket.on("join-conversation",async (data)=>{
        try {
            const conversationKey = data.conversationKey;
            socket.join(conversationKey);
            if(sharedState.chatRooms.has(conversationKey)){
                sharedState.chatRooms.get(conversationKey).count++;
            }
            else {
                const chatRoom = await CHATROOMS
                    .findOne({
                        conversationKey: conversationKey,
                    })
                    .lean();

                console.log(chatRoom.participants)
                sharedState.chatRooms.set(conversationKey, {
                    participants : chatRoom.participants,
                    count : 1,
                })
            }
            console.log("join room : " + conversationKey);
        
        }catch(err){
            console.log("error from the joinConversationSocket : " + err);
        }
    })
}

module.exports = joinConversationSocket;