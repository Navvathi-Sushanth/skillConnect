const jwt = require("jsonwebtoken");

function convertJWT(token) {
    try{

        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;

    }catch(err){
        console.log("Error in the jwt converter : " + err);
        return null;
    }
}

module.exports = {
    convertJWT
}