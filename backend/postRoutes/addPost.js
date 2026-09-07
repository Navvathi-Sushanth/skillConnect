const { POSTS, USERS } = require("../Database/Models");
const jwt = require("jsonwebtoken");


async function addPost(req, res){
    const image = req.body.image;
    const description = req.body.description;
    const token = req.headers.token;

    const decoded = jwt.verify(token,process.env.JWT_SECRET);


    const { _id : userId }= await USERS.findOne({
        userEmail : decoded.userEmail,
    }).select("_id");


    const post = await POSTS.create({
        userId : userId,
        description: description,
        imgUrl : image,
    });


    const posts = await POSTS.find({
        userId: userId,
    });
    console.log("users posts : ");
    console.log(posts);
    
    
    console.log(post);

    res.json({
        message: "successfully add post",
    })
}

module.exports = addPost;