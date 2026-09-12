const {
    USERS,
    SIGNUP_USERS, 
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
    });

    if(user){
        return  res.status(409).json({
                    message: "User is already exists",
                    token: user._id,
                })
    }

    user = await USERS.findOne({
        userName: userName,
    });

    if(user){
        return res.status(409).json({
                message: "UserName already exists",
                token: user._id,
            })
    }

    try {

        user = await SIGNUP_USERS.findOne({
            userEmail,
        })

        if(user){

            const updatedUser = await SIGNUP_USERS.findOneAndUpdate(
                {userEmail},
                {
                    $set: {
                        userName,
                        userPIN,
                        userPassword
                    }
                },

                {
                    new: true,
                    runValidators: true,
                }
            )

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

        return res.status(201).json({
            message: "signUp successfully",
            token: user._id,
        })

    }catch(err){
        console.log("Error from SingUp : " + err.message);
        if(err.code==11000){
            return res.status(409).json({
                message: `${Object.keys(err.keyValue)[0]} already exists`
            });
        }
        return res.status(500).json({
            message: "Internal server error from data base",
            token: null,
        });
    }
}

module.exports = signUp;