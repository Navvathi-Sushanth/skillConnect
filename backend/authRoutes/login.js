const { USERS } = require("../Database/Models");
const { createWebToken } = require("../authRoutes/jwtToken.js");

async function login(req, res){
    console.log(req.body)
    const { userEmail, userPIN, userPassword} = req.body;

    const user = await USERS.findOne({
        userEmail,
        userPIN,
        userPassword,
    });

    console.log(user);
    
    if(user != null){
        const token = createWebToken({
            userEmail,
            userPIN,
        });
        res.status(200).json({
            message : "authorized",
            token: token,
            userId: user._id,
        });
    }
    else {
        res.status(401).json({
            message: "unauthorized",
            token : null,
        })
    }
       
}

module.exports = login;