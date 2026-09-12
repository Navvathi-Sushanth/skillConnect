const nodemailer = require("nodemailer");
const { SIGNUP_USERS, OTPS, USERS,DETAILS } = require("../Database/Models");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "campusconnectbyte@gmail.com",
        pass: "ywdt yavm lajj uush",
    }
});

const generateOTP = ()=>{
    const otp = Math.floor(100000+Math.random()*900000);
    return otp;
}

async function sendOTP(req,res){

   

   try{

    const email = req.body.email;

    const user = await SIGNUP_USERS.findOne({
        userEmail: email,
    });

    console.log(user)

    const otp = generateOTP().toString();

    const expiresAt = new Date(Date.now() + 10*60*1000);

    const newOTP = await OTPS.create({
        otp: otp,
        userEmail: email,
        expiresAt: expiresAt,
    });

    await transporter.sendMail({
        from: "campusconnectbyte@gmail.com",
        to: email,
        subject: "CampusConnect Email Verification",
        html: `
        
            <h2>CampusConnect Email Verification</h2>
            <p>Your verification OTP is : </p>
            <h1>${otp}</h1>
            <p>This OTP will expire in 10 minutes.</p>
        `
    });

    console.log("sent successfully")
    res.json({
        message: "successfully sent the OTP",
    })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "internal server error",
        })
    }
}

async function verifyOTP(req, res){
    try{

        const {
            userEmail,
            otp
        } = req.body;

        const dataBaseOTP = await OTPS
            .findOne({
                userEmail: userEmail,
            })
            .sort({
                createdAt: -1,
                _id: -1,
            });

        console.log(otp,dataBaseOTP.otp)

        if(dataBaseOTP.expiresAt < Date.now()){
            return res.status(400).json({
                message: "OTP expired"
            });
        }
        else {
            if(otp==dataBaseOTP.otp){
                const user = await SIGNUP_USERS.findOne({
                    userEmail: userEmail,
                })

                const {_id, ...validUser} = user.toObject();

                const newValidUser = await USERS.create(validUser);

                const details = DETAILS.create({
                    userId: newValidUser._id,
                });

                return res.status(200).json({
                    message: "verified",
                    user: newValidUser
                });
            }
            else {
                return res.status(200).json({
                    message: "incorret OTP"
                });
            }
        }

    }catch(err){
        console.log("Error in the verifyOTP : " + err)
    }
}


module.exports = {
    sendOTP,
    verifyOTP,
};