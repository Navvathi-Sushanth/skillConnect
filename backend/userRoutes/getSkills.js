const { USERS, EXPERTS, LEARNS } = require("../Database/Models.js");
const jwt = require("jsonwebtoken");

async function getSkills(req, res) {

    try {

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
        

        const expertSkills = await EXPERTS
            .find({
                userId: userId,
            })
            .select("skill");

        const learnSkills = await LEARNS
            .find({
                userId: userId,
            })
            .select("skill");

        if(expertSkills){
            return res.status(200).json({
                message: "request successfull",
                expertSkills: expertSkills,
                learnSkills: learnSkills,
            });
        }

    }catch(err){
        console.log("Error from the getSkills of Experts"+ err);
        return res.status(200).json({
            message: "Error from the getSkill of Experts : " + err,
            expertSkills: null,
        });
    }
    res.status(200).json({
        message: "request successfull",
        expertSkills: null,
    });
}

async function addSkill(req, res){

    try {
        const token = req.headers.token;
        const decoded = jwt.verify( token, process.env.JWT_SECRET);

        const userId = await USERS
            .findOne({
                userEmail: decoded.userEmail,
                userPIN: decoded.userPIN,
            })
            .select("_id");

        const component = req.body.component;
        const skill = req.body.skill;
        console.log(req.body.component)
        let newSkill = null;
        if(component=="expert"){
            newSkill = await EXPERTS.create({
                userId: userId,
                skill: skill,
            });
        }
        else {
            newSkill = await LEARNS.create({
                userId: userId,
                skill: skill,
            });
        }


        return res.status(201).json({
            message: "successfully created new expert",
            newSkill: newSkill,
        })
    }catch(err){
        console.log("Error from the post route of addSkill"+ err);
        return res.status(500).json({
            message: "Error in the AddSkill route"+ err,
        });
    }

    res.status(200).json({
        message: 'request successfull, but some went wrong in the addSkill',
    })

}


async function deleteSkill(req, res) {

    try {
        console.log("in delete req")
        console.log(req.body)

        const component = req.body.component;
        const childId = req.body.childId;

        if(component=="expert"){
            console.log("in expert")
            const deleted = await EXPERTS.findOneAndDelete({
                _id: childId,
            })
            if(!deleted){
                return res.status(404).json({
                    message: "skill is not found"
                })
            }

            return res.status(200).json({
                message: "skill is deleted",
                deleted: deleted,
            })
        }
        else {
            const deleted = await LEARNS.findOneAndDelete({
                _id: childId,
            })
            if(!deleted){
                return res.status(404).json({
                    message: "skill is not found"
                })
            }

            return res.status(200).json({
                message: "skill is deleted",
                deleted: deleted,
            })
        }

    }catch(err){
        return res.status(500).json({
        message: err.message
        });
    }
    
}


module.exports = {
    getSkills,
    addSkill,
    deleteSkill,
};