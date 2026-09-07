const { USERS, DETAILS } = require("../Database/Models.js");
const jwt = require("jsonwebtoken");

async function saveDetails(req, res) {

    try {

        const data = req.body.data;
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = await USERS
            .findOne({
                userEmail: decoded.userEmail,
                userPIN: decoded.userPIN,
            })
            .select("_id");
        
        const updatedDetails = await DETAILS.findOneAndUpdate(
            { userId: userId },
            {
                $set: data,
            }
        )

        return res.status(201).json({
            message: "successfully modified",
            updatedDetails: updatedDetails,
        });

    }catch(err){
        console.log(
            "Error from the save Details page"
        )
    }

    res.status(304).json({
        message: "data is not changed"
    });
    
}

module.exports = saveDetails;