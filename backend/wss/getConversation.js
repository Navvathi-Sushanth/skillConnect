const { USERS } = require("../Database/Models.js");

async function getConversationKey(req, res){
    try{

        const {

            userEmail,
            otherUserId,

        } = req.body;

        const userId = await USERS
            .findOne({
                userEmail: userEmail,
            })
            .select("_id");

        const conversationKey = [userId.toString(), otherUserId.toString()].sort().join("_");

        console.log(conversationKey);


    }catch(err){

        console.log("Error from the get-connection-key"+err)

    }
}

module.exports = {
    getConversationKey,
}