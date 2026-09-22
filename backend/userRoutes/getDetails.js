const jwt = require("jsonwebtoken");
const { USERS, DETAILS, CONNECTIONS } = require("../Database/Models.js");

async function getDetails(req, res){
    try {

        const token = req.headers.authentication;
        const reqUserId = req.headers?.userid;
        let userId = null;

        console.log(typeof reqUserId)

        console.log(!reqUserId)
        
        if(reqUserId == "undefined" || !reqUserId){
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );
            
            console.log(decoded);

            const user =await  USERS
                .findOne({
                    userEmail: decoded.userEmail,
                    userPIN: decoded.userPIN,
                })
                .select("_id");

             console.log("inside if ",userId)

            userId = user._id;
        }
        else {
            console.log("inside else ",userId)
            userId = req.headers.userid;
            console.log(userId)
        }

        const user = await DETAILS
            .findOne({
                userId: userId,
            })
            .populate(
                "userId",
                "userName userPIN userEmail userProfileImg"
            );

        const followerCount = await CONNECTIONS.countDocuments({
            followingId: userId,
        });

        const followingCount = await CONNECTIONS.countDocuments({
            followersId: userId,
        });

        let cleanedUser = null;
        if(user){
            cleanedUser = {
                userName : user.userId.userName,
                userEmail : user.userId.userEmail,
                userPIN : user.userId.userPIN,
                userProfileImg: user.userId.userProfileImg,
                userDepartment : user.userDepartment,
                userYear: user.userYear,
                userPhone: user.userPhone,
                userLocation: user.userLocation,
                userCollege: user.userCollege,
                userAbout: user.userAbout,
                isUser: (reqUserId == "undefined" || !reqUserId),
                followerCount,
                followingCount,
            }
        }

        console.log(cleanedUser)

        return res.status(200).json({
            cleanedUser,
        })
    }catch(err){
        console.log("Error in the getDetails : "+ err);
        return res.status(200).json({
            message: "something went incorrect in database of getDetails",
        })
    }
    res.status(200).json({
        message: "something went incorrect in getDetails route",
    })
}

module.exports = getDetails;