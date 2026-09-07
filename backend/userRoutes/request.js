const {REQUESTS, USERS, CONNECTIONS} = require("../Database/Models.js");
const jwt = require("jsonwebtoken")

async function postRequest(req, res) {

    try{

        const token = req.headers.token;

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const sender = await USERS
            .findOne({
                userEmail: decoded.userEmail,
                userPIN: decoded.userPIN,
            })
            .select("_id");

        const { receiver } = req.body;

        console.log(receiver,sender);

        const isExist = await REQUESTS.findOne({
            sender: sender,
            receiver: receiver,
        });

        const isConnectionExist = await CONNECTIONS.findOne({
            followersId: sender,
            followingId: receiver,
        })

        console.log(isConnectionExist);

        if(isConnectionExist){
            return res.status(200).json({
                message: "connection is already exist",
            })
        }
        if(isExist){
            return res.status(200).json({
                message: "request is pending",
            });
        }
        else {
            const request = await REQUESTS.create({
                sender: sender,
                receiver: receiver,
            })

            return res.status(201).json({
                message: "request successfully send"
            });
        }

    }catch(err){
        console.log("Error in the request route function : "+ err.message)
        res.status(500).json({
            message: "internal server Error " + err.message,
        })
    }

    res.status(200).json({
        message: "request reached but issuse in creating the request",
    })
    
}

async function getRequests(req,res){
    try{

        const token = req.headers.token;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        const userId = await USERS
            .findOne({
                userEmail: decoded.userEmail,
                userPIN: decoded.userPIN,
            })
            .select("_id");

        const requests = await REQUESTS
            .find({
                receiver: userId,
            })
            .populate(
                "sender",
                "userName userEmail userProfileImg"
            )
        console.log(requests);
        res.status(200).json({
            message: 'successfull request',
            requests: requests,
        })

    }catch(err){
        console.log("Error from the getRequest : "+ err.message);
        res.status(500).json({
            message: "Error from getRequest : "+err.message,
            requests: null,
        });
    }
}

async function requestResponse(req, res) {

    try{

        const {
            senderId,
            receiverId,
            response,
        } = req.body;
        console.log(req.body)

        const isRequestExist = await REQUESTS.findOne({
            sender: senderId,
            receiver: receiverId,
        });

        console.log(isRequestExist)

        if(isRequestExist != null){

            let connection=null;
            if(response=="accept"){
                console.log("inside accept");
                connection = await CONNECTIONS.create({
                    followersId: senderId,
                    followingId: receiverId,
                });

            }

            const deletedRequest = await REQUESTS.findOneAndDelete({
                sender: senderId,
                receiver: receiverId,
            })

            if(connection!=null){
                return res.status(201).json({
                    message: "request is accepted",
                    connection: connection,
                });
            }
        }

    }catch(err){
        console.log(
            "Error from request response : " + err.message
        )
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR : "+ err.message,
        })
    }
    res.status(200).json({
        message: "some thing went wrong in the request response"
    })
    
}

module.exports = {
    postRequest,
    getRequests,
    requestResponse,
}