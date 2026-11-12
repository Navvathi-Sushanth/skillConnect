const jwt = require("jsonwebtoken");
const { getUserId } = require("../userFunctions/getUserId.js");

async function verifySocketAuth(socket, next){
    try {
        const {
            token
        } = socket.handshake.auth;
    
        if(!token){
            return next(new Error("Unauthorized: Token missing"));
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        
        const userId = await getUserId(data.userEmail);

        if(!userId){
            return next(new Error("Unauthorized: User not found"));
        }

        socket.userId = userId;

        next();
    }catch(err){
        next(new Error("Unauthorized: Invalid or expired token"));
    }
}

module.exports = verifySocketAuth