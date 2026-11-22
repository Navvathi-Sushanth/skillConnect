const { USERS } = require("../Database/Models");
const { convertJWT } = require("../middleWares/jwtHelpers");

function disconnectedSocket(io, socket, onlineUsers){

    try {

        socket.on("socketDisconnected", async ({token})=>{

            const user = convertJWT(token);
            if(null){
                return;
            }

            const decoded = await USERS
                .findOne({
                    userEmail : user.userEmail,
                    userPIN: user.userPIN
                })
                .select("_id");

            const { _id: userId } = decoded;

            onlineUsers.delete(userId.toString());
        });

    }catch(err){
        console.log("Error from the disconnect socket : " + err);
    }

}

module.exports = disconnectedSocket;