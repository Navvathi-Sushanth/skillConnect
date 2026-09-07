const { USERS } = require("../Database/Models.js");

async function getUsers(req, res) {
    try {

        const searchQuery = req.body?.search || "";

        if(searchQuery.trim()==""){
            return res.status(200).json({
                message: "NO user found",
                users: null,
            });
        }

        const users = await USERS
            .find({
                $or: [

                    {
                        userName: {
                            $regex: searchQuery, 
                            $options: "i",
                        }
                    },

                    {
                        userEmail: {
                            $regex: searchQuery,
                            $options: "i",
                        }
                    },

                    {
                        userPIN : {
                            $regex: searchQuery,
                            $options: "i",
                        }
                    }
                ]
            })
            .limit(10);


        console.log(users);
        let cleanedUsers = null;
        if(users){
 
            cleanedUsers = users.map((user)=>({
                userId : user?._id,
                userName: user?.userName,
                userEmail: user?.userEmail,
                userProfileImg: user?.userProfileImg || `https://static.vecteezy.com/
                    system/resources/previews/026/619/142/original/default-
                    avatar-profile-icon-of-social-media-user-photo-image-vector.jpg`,
            }));

            return res.status(200).json({
                message: "query successfull",
                users: cleanedUsers,
            });
        }


    }catch(err){
        console.log("Error from getUsers : " + err);
        return res.status(500).json({
            message: "NO user found",
            users: null,
        })
    }
    return res.status(200).json({
        message: "NO user found",
        users: null,
    });
}

module.exports = getUsers;