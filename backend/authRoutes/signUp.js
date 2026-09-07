const { USERS, DETAILS } = require("../Database/Models.js");

async function signUp(req, res){

    const { 
        userName,
        userEmail, 
        userPIN, 
        userPassword
    } = req.body;

    
    let user = null;

    user = await USERS.findOne({
        userEmail,
        userPIN
    });

    if(user){
        return  res.status(409).json({
                    message: "User is already exists",
                })
    }

    try {

        user = await USERS.create({
            userName,
            userEmail, 
            userPIN, 
            userPassword
        });

        details = DETAILS.create({
            userId: user._id,
        });

        return res.status(201).json({
            message: "signUp successfully",
        })

    }catch(err){
        console.log("Error from SingUp : " + err);
        return res.status(500).json({
            message: "Internal server error from data base",
        });
    }
}

module.exports = signUp;