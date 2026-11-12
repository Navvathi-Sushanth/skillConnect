const { MESSAGES } = require("../Database/Models");

async function initialMessages(req, res) {
    try {

        const {
                conversationkey
            } = req.headers;

        console.log(conversationkey)
        const messages = await MESSAGES
            .find({
                conversationKey: conversationkey,
            })
            .sort({ createdAt : -1 })
            .limit(30)
            .lean();

        return res.json({
            messages : messages,
        })

    }catch(err){
        console.log("Error from the initial messages : " + err );
        return res.json({
            message: "Error from the initial messages : " + err,
        });
    }
    return res.json({
        message : "Error from the initial messages",
    });
}

module.exports = {
    initialMessages,
}