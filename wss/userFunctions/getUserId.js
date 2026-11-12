const {
    USERS
} = require("../Database/Models.js");

async function getUserId(email){
    const user = await USERS
        .findOne({
            userEmail : email,
        })
        .select("_id");

    console.log(user._id);

    if(user==null){
        return user;
    }

    return user._id.toString();
}

module.exports = {
    getUserId,
}