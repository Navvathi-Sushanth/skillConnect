const { POSTS, USERS } = require("../Database/Models");
const jwt = require("jsonwebtoken");

const { uploadImage } = require("../Services/Cloudinary.js")


async function addPost(req, res){
    
    try{

        const imageBuffer = req.file.buffer;
        const description = req.body.description;
        const token = req.headers.token;

        const decoded = jwt.verify(token,process.env.JWT_SECRET);


        const { _id : userId }= await USERS.findOne({
            userEmail : decoded.userEmail,
        }).select("_id");

        const newPost = uploadImage({
            userId,
            imageBuffer,
            description,
        })
        
        console.log(newPost);

    }catch(err){
        console.log("Error from add post : "+err);
        return res.status(500).json({
            message: "Internal server Error : " + err
        })
    }
    return res.status(200).json({
        message: "logical error in the add post file in backend"
    })
}

module.exports = addPost;