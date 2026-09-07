const { USERS, POSTS } = require("../Database/Models.js");
const jwt = require("jsonwebtoken");


async function getUserPosts(req, res){

    try {

        if(req.headers.token){

            const token = req.headers.token;
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
    
                console.log("inside if ",user)
    
                userId = user._id;
            }
            else {
                userId = req.headers.userid;
                console.log(userId)
            }

            const page = req.query.page;

            const skip = (page-1)*10;
            
            if(userId){
                console.log("inside userid if")
                const posts = await POSTS
                    .find({
                        userId: userId,
                    })
                    .sort({
                        CreatedAt : -1,
                        _id: -1,
                    })
                    .skip(skip)
                    .limit(10)
                    .select("userId description imgUrl")
                    .populate("userId", "userName userProfileImg");
                
                let cleanedPost = null;
                if(posts!=null){
                    cleanedPosts = posts.map((post)=>({
                        postId : post._id,
                        userName : post.userId?.userName,
                        profileImg : post.userId?.userProfileImg,
                        description : post.description,
                        imgUrl : post.imgUrl,
                        isUser: (reqUserId == "undefined" || !reqUserId),
                    }));

                    res.status(200).json({
                        message: "succefull send the user posts",
                        posts: cleanedPosts,
                    })
                }

                else {
                    res.status(200).json({
                        message: "no post left",
                        posts: null,
                    })
                }

            }

        }
        else {
            res.status(401).json({
                message: "no token reached",
                posts: null,
            })
        }

    }catch(err){
        console.log("Error in the UserPost route : " + err);
        res.status(401).json({
            message: "Issue in database server",
            posts: null,
        })
    }

}

module.exports = getUserPosts;