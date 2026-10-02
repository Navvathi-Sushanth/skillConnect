import { EditBtn, SubHeader, DetailComponent, Footer, SkillFooter, Skill, SubHeader2 } from "../components/ProfileComponents"
import { useState,useRef, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";


export default function ProfileSkill(props){

    const expertSkillsValue = useState("");

    const userId = useParams()?.id;
    
    const { details, setDetails } = useOutletContext();
    
    const [aboutEdit, setAboutEdit] = useState(false);
    const [detailsEdit, setDetailsEdit] = useState(false);
    const [skillsExpertEdit, setSkillsExpertEdit] = useState(false);
    const [skillsLearnEdit,setSkillsLearnEdit] = useState(false);

    const [expertSkills, setExpertSkills] = useState([]);
    const [learnSkills, setLearnSkills] = useState([]);

    const [newExpertSkill,setNewExpertSkill] = useState("");
    const [newLearnSkill,setNewLearnSkill] = useState("");
  
    const onChangeHandler = (e)=>{
        const key = e.target.id;
        const value = e.target.value;
        setDetails((prev)=>({
            ...prev,
            [key] : value,
        }))
    }


    const deleteSkill = async (childId,component)=>{
        try{

            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/delete-skill`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    childId: childId,
                    component: component,
                })
            })

            const data = await response.json();

        }catch(err){
            console.log("Error from delete skill : "+err)
        }
        finally{
            getSkill();
        }
    }


    const addSkill = async (newSkill,type)=>{

        try {

            if(newSkill.trim()==""){
               return;
            }

            if(type=="expert"){
                setNewExpertSkill("");
            }
            else{
                setNewLearnSkill("");
            }
            
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/add-skill`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
                body : JSON.stringify({
                    skill: newSkill,
                    component: type,
                })
            });

            const data = await response.json();


        }catch(err){
            console.log("error from add skill : "+err)
        }
        finally{
            getSkill();
        }

    }


    const saveDetails = async (componenet)=>{
        try {

            let data = null;
            console.log(componenet)
            if(componenet==="About"){
                data = {
                    userAbout : details.userAbout,
                }
            }
            else {
                data = {
                    userDepartment : details.userDepartment,
                    userCollege: details.userCollege,
                    userYear: details.userYear,
                    userPhone: details.userPhone,
                }
            }

            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/save-details`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "token" : token,
                },
                body: JSON.stringify({
                    data: data,
                })
            });
            const result = await response.json();

        }catch(err){
            console.log("Error from the Profileskill of saveDetails");
        }
    }

    async function getSkill() {

        try{

            const token = localStorage.getItem("token")

            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/get-skills`,{
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "token": token,
                    "userid": userId,
                }
            });

            const data = await response.json();
            setExpertSkills(data.expertSkills);
            setLearnSkills(data.learnSkills);

        }catch(err){
            console.log("Error from the getExperts : "+ err);
        }
        
    }

    useEffect(()=>{

        getSkill();

    },[userId]);


    return (
        <div className="sub-profile-page page">
            <div className="about-box">
                {
                    (details.isUser)?
                        <SubHeader header={"About Me"} handler={setAboutEdit}/>
                    :
                        <SubHeader2 header={"About Me"} />
                }
                {
                    (aboutEdit)?
                        <div className="about-edit-boc">
                            <textarea 
                                id="userAbout"
                                name="about-input"
                                className="about-input"
                                value={details.userAbout}
                                onChange={onChangeHandler}
                            ></textarea>
                            <Footer 
                                    onClick = {{
                                        saveDetails: saveDetails,
                                        component: "About",
                                    }}
                            />
                        </div>
                    :
                        <p className="about-text">
                            {details.userAbout}
                        </p>

                }
            </div>
            <div className="detail-box">

                {
                    (details.isUser)?
                        <SubHeader header={"Details"} handler={setDetailsEdit} />
                    :
                        <SubHeader2 header={"Details"} />
                }

                <DetailComponent values = {{
                    id: "userPIN",
                    title: "Roll Number",
                    value: details.userPIN,
                    imgUrl: "",
                    status: {detailsEdit},
                    onChange: onChangeHandler,
                }}/>
                <DetailComponent values = {{
                    id: "userDepartment",
                    title: "Department",
                    value: details.userDepartment,
                    imgUrl: "",
                    status: {detailsEdit},
                    onChange: onChangeHandler,
                }}/>
                <DetailComponent values = {{
                    id: "userCollege",
                    title: "College",
                    value: details.userCollege,
                    imgUrl: "",
                    status: {detailsEdit},
                    onChange: onChangeHandler,
                }}/>
                <DetailComponent values = {{
                    id: "userYear",
                    title: "Year",
                    value: details.userYear,
                    imgUrl: "",
                    status: {detailsEdit},
                    onChange: onChangeHandler,
                }}/>
                <DetailComponent values = {{
                    id: "userEmail",
                    title: "Email",
                    value: details.userEmail,
                    imgUrl: "",
                    status: {detailsEdit},
                    onChange: onChangeHandler,
                }}/>
                <DetailComponent values = {{
                    id: "userPhone",
                    title: "Phone",
                    value: details.userPhone,
                    imgUrl: "",
                    status: {detailsEdit},
                    onChange: onChangeHandler,
                }}/>
                {
                    detailsEdit
                    &&
                    <Footer 
                        onClick={{
                            saveDetails: saveDetails,
                            component: "Details",
                        }}
                    />
                }
                
            </div>
            <div className="skills-export">
                {
                    (details.isUser)?
                        <SubHeader header={"Expert in skills"} handler={setSkillsExpertEdit}/>
                    :
                        <SubHeader2 header={"Expert in skills"} />
                }
                
                {
                    (expertSkills.length == 0) ?
                        <h3> Not Yet added</h3>
                    :
                        expertSkills.map(
                            (skill)=><Skill 
                                text={skill.skill} 
                                key={skill._id} 
                                type={"expert"}
                                editStatus={skillsExpertEdit}
                                childId={skill._id}
                                deleteSkill={deleteSkill}
                            />)
                }
                {
                    skillsExpertEdit
                    &&
                    <>
                        <SkillFooter 
                            type={"expert"}
                            addSkillHandler = {addSkill}
                            newSkill = {newExpertSkill}
                            newSkillHandler={setNewExpertSkill}
                        />
                    </>

                }
            </div>
            <div className="skills-learn">
                {
                    (details.isUser)?
                        <SubHeader header={"Skill want to learn"} handler={setSkillsLearnEdit}/>
                    :
                        <SubHeader2 header={"Skill want to learn"} />
                }
                {
                    (learnSkills.length == 0)?
                        <h3>Not added Yet</h3>
                    :
                        learnSkills.map(
                            (skill)=><Skill 
                                text={skill.skill} 
                                key={skill._id} 
                                type={"learn"}
                                editStatus={skillsLearnEdit}
                                childId={skill._id}
                                deleteSkill={deleteSkill}
                            />)
                }
               
                {
                    skillsLearnEdit
                    &&
                    <>
                        <SkillFooter 
                            addSkillHandler = {addSkill}
                            newSkill = {newLearnSkill}
                            newSkillHandler= {setNewLearnSkill}
                            
                        />
                    </>
                }
            </div>
        </div>
    )
}