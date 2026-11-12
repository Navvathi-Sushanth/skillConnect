const jwt = require("jsonwebtoken");
const { USERS } = require("../Database/Models.js");

function createWebToken(user){

    const { userEmail, userPIN } = user;

    const token = jwt.sign(
        {
            userEmail,
            userPIN
        },

        process.env.JWT_SECRET,

        { expiresIn : "1d" }

    );

    return token;
    
}

async function verifyToken(req, res){
    try{

        if(req.headers.authorization!=null){
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await USERS.findOne({
                userEmail : decoded.userEmail,
                userPIN : decoded.userPIN,
            });

            if(user!=null){
                return res.status(200).json({
                    message: "authorized",
                })
            }
        }
        
    }catch(err){
        console.log("Error in the verify token : "+err);
        return res.status(401).json({
            message: "unauthorized",
        })
    }
    return res.status(401).json({
        message: "unauthorized",
    })
}

function convertJWT(token) {
    try{

        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;

    }catch(err){
        console.log("Error in the jwt converter : " + err);
    }
}

module.exports = {
    createWebToken,
    verifyToken,
    convertJWT,
}