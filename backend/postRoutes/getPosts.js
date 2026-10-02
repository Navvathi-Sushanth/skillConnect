const { POSTS } = require("../Database/Models.js");
const { post } = require("../Database/postShema.js");

async function getPosts(req, res) {
    try{

        const page = req.query.page || 1;
        const skip = (page-1)*10;

        const posts = await POSTS
            .find()
            .sort({
                _id: -1,
                createdAt: -1
            })
            .skip(skip)
            .limit(10)
            .select("userId description secureImgUrl")
            .populate("userId","_id userName userProfileImg");

        
        
        let cleanedPosts = null;
        if(posts!=null){
            cleanedPosts = posts.map((post)=>({
                userId: post.userId._id,
                description: post.description,
                imgUrl: post.secureImgUrl,
                userName : post.userId?.userName || "UnknowUser",
                profileImg : post.userId?.userProfileImg,
            }));

            console.log(cleanedPosts);

            return res.json({
                message: "successful",
                posts: cleanedPosts,
            })

        }

       

    }catch(err){
        console.log("error from the getPost" + err);
        return res.json({
            message: "database connection error",
            posts: null,
        })
    }
    return res.json({
        message: "logical error in the get post",
        posts: null,
    })
}

module.exports = getPosts;