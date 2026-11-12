const { convertJWT } = require("../authRoutes/jwtToken");
const { USERS } = require("../Database/Models");
const { uploadImgToCloudinary } = require("../Services/Cloudinary");


async function changeProfile(req, res){
    try{
        const userProfileImg = req.file.buffer;

        console.log(userProfileImg);
        const { token } = req.headers;
        const data = convertJWT(token);
        const { userEmail } = data;
        
        const result = await uploadImgToCloudinary(userProfileImg);
        if(result == null){
            return res.status(500).json({
                message : "Clodinary service Error",
            })
        }

        const {
            publicId,
            secureImgUrl
        } = result;

        console.log(publicId, secureImgUrl)
        
        const changedUser = await USERS.findOneAndUpdate(
            { userEmail : userEmail },
            {
                $set : {
                    userProfileImg : secureImgUrl,
                    publicId: publicId,
                }
            },
            { new : true, runValidators: true}
        );
        
        console.log(changedUser);

        if(changedUser==null){
            return res.status(500).json({
                message: "Internal server Error "
            })
        }
         
        res.status(201).json({
            message: "successfull changed profile ",
        });

    }catch(err){
        console.log("Error in the changeProfile : " + err);
        return res.status(500).json({
            message: "internal server Error " + err
        })
    }
}

module.exports = {
    changeProfile,
}