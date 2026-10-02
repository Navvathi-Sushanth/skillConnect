const { POSTS } = require("../Database/Models.js");
const cloudinary = require("./cloudinaryConfig.js");

async function uploadImage(data) {
    
    try{
        const {
            userId,
            imageBuffer,
            description
        } = data;

        const result = await new Promise((resolve, reject)=>{

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "campusConnect/posts"
                },
                (error,result)=>{
                    if(error){
                        reject(error);
                    }
                    else{
                        resolve(result);
                    }
                },
            );
            stream.end(imageBuffer);

        })

        console.log("Public Id : "+ result.public_id);
        console.log("Img Url : " + result.secure_url);

        const uploadedImage = await POSTS.create({
            userId: userId,
            secureImgUrl : result.secure_url,
            description: description,
            publicId : result.public_id
        });
        return uploadedImage;
    }catch(err){
        console.log("Error from the cloudinary : " + err.message);
        return null;
    }
    return null;

}

module.exports = {
    uploadImage
}