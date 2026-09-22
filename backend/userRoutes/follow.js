const { CONNECTIONS, USERS } = require("../Database/Models.js");

async function getConnections(req,res){
    try{

        const {
            userEmail,
            reqUserId,
            fetchType,
        } = req.body;


        console.log(userEmail)

        const user = await USERS
            .findOne({
                userEmail: userEmail,
            })
            .select("_id");

        let userId=null;

        if(reqUserId=="undefind"||!reqUserId){
            userId = user;
        }
        else{
            userId=reqUserId;
        }

        let connections=null;
        let cleanedConnections = null;

        if(fetchType=="followers"){
            connections = await CONNECTIONS
                .find({
                    followingId : userId,
                })
                .select("_id followersId")
                .populate(
                    "followersId",
                    "userName userEmail userProfileImg"
                );
            console.log(connections);
            cleanedConnections = connections.map(({_id,followersId})=>({
                _id: _id,
                userName: followersId.userName,
                userEmail: followersId.userEmail,
                userProfileImg: followersId.userProfileImg,
            }));
        }

        else {
            connections = await CONNECTIONS
                .find({
                    followersId : userId,
                })
                .select("_id followingId")
                .populate(
                    "followingId",
                    "userName userEmail userProfileImg"
                );

                cleanedConnections = connections.map(({_id,followingId})=>({
                    _id: _id,
                    userName: followingId.userName,
                    userEmail: followingId.userEmail,
                    userProfileImg: followingId.userProfileImg,
                }));

                console.log(cleanedConnections)
        }

        return res.status(200).json({
            message: "successfull get the connections",
            connections: cleanedConnections,
        })


    }catch(err){
        console.log("Error from getFollowers : "+ err);
        res.status(500).json({
            message: "internal server error",
            followers: null,
        })
    }

    res.status(200).json({
        message: "something wrong in the login of get connections",
    });
}

async function removeConnection(req, res){
    try{

        const { id } = req.body;
        const result = await CONNECTIONS.findOneAndDelete({
            _id: id,
        });

        return res.status(201).json({
            message: "successfully deleted",
        });
 
    }catch(err){
        console.log("Error from removeConnection : " + err);
        return res.status(500).json({
            message: err.message()
        });
    }
    return res.status(201).json({
        message: "logical erro in the removeConnection",
    });
}

module.exports = {
    getConnections,
    removeConnection,
}