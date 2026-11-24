const { USERS } = require("../Database/Models");
const { createWebToken } = require("../authRoutes/jwtToken.js");
const { verifyPassword } = require("./password.js");

async function login(req, res){
    
    const { userEmail, userPIN, userPassword} = req.body;

    const user = await USERS.findOne({
        userEmail,
        userPIN
    });

    console.log(user);
    
    if(user != null){

        const checkPassword = await verifyPassword(userPassword,user.userPassword);
        if(checkPassword == false){
            return res.status(401).json({
                message: "unauthorized",
                token : null,
            });
        }

        const token = createWebToken({
            userEmail,
            userPIN,
        });
        return res.status(200).json({
            message : "authorized",
            token: token,
            userId: user._id,
        });
    }
    else {
        return res.status(401).json({
            message: "unauthorized",
            token : null,
        })
    }
       
}

module.exports = login;