import editIcon from "../icons/edit-icon.svg";
import "./profileComponents.css";
import xIcon from "../images/x-img1.png";
export function EditBtn(props){
  
    const edit = props?.clickHandler;

    return (
        <button className="about-edit-btn" onClick={()=>{
            edit((prev)=>!prev);
        }}>
            <img 
                src={editIcon} 
                alt="edti-icon" 
                className="edit-icon"
            />
            Edit
        </button>
    )
}
export function SubHeader(props){
    const headerValue = props.header;
    const handler = props?.handler;

    return (
        <header className="adout-header">
            <h3>{headerValue}</h3>
            <EditBtn clickHandler = {handler}/>
        </header>
    )
}

export function SubHeader2(props){
    const headerValue = props.header;
    return (
        <header className="adout-header">
            <h3>{headerValue}</h3>
        </header>
    )
}

export function DetailComponent(props){

    const {title, value, imgUrl, status, onChange, id} = props.values;


    console.log(props.values)


    return(
        <div className="detail-component">
            <h4 className="detail-title">{title}</h4>
            {
                (status.detailsEdit) ?

                    <textarea 
                        id={id}
                        type="text" 
                        value={value} 
                        className="details-input"
                        onChange={onChange}
                    />
                   
                :
                    <h4 className="detail-value">{value}</h4>
                    
                
            }
        </div>
    )
}

export function Footer(props){
    
    const { handler, onClick } = props;
    const { saveDetails, component} = onClick;
    console.log(onClick)
    console.log(component);

    return (
        <div className="save-exit-footer">
            <button 
                className="save-btn" 
                onClick={()=>saveDetails(component)}
            >
                save
            </button>
        </div>
    )
}

export function SkillFooter(props) {
    const {
        type,
        addSkillHandler,
        newSkill,
        newSkillHandler,
    } = props;
    console.log(props)
    return (
        <div className="skill-footer">
            <input 
                autoFocus
                type="text" 
                placeholder="Add new skill" 
                className="add-skill-input"
                value={newSkill}
                onChange={(e)=>newSkillHandler(e.target.value)}
            />
            <button 
                className="add-skill-btn" 
                onClick={()=>{
                    console.log("inside onclick")
                    type:{type}
                    addSkillHandler(newSkill,type);
                }}
            > +Add</button>
        </div>
    )
}

export function Skill(props){
    const {
        editStatus,
        text,
        childId,
        deleteSkill,
        type,
    } = props;

    return (
        <div className="skill-box">
            <h4>{text}</h4>
            {
                editStatus
                &&
                <button 
                    className="skill-delete-btn"
                    onClick={()=>deleteSkill(childId,type)}
                >
                    X
                </button>
            }
        </div>
    )
}