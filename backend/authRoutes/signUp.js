const {
    USERS,
    SIGNUP_USERS,
    DETAILS 
} = require("../Database/Models.js");

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
                    token: user._id,
                })
    }

    try {

        user = await SIGNUP_USERS.findOne({
            userEmail,
            userPIN,
        })

        if(user){

            return res.status(201).json({
                message: "signUp successfully",
                token: user._id,
            })

        }

        user = await SIGNUP_USERS.create({
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
            token: user._id,
        })

    }catch(err){
        console.log("Error from SingUp : " + err);
        return res.status(500).json({
            message: "Internal server error from data base",
            token: null,
        });
    }
}

module.exports = signUp;