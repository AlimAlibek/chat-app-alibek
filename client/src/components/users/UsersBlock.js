import {useState} from "react";
import "./users-block.css"



function UsersBlock(props) {
    const [isUsersHidden, setIsUsersHidden] = useState(false);

    function ballClickHandler() {
        setIsUsersHidden(!isUsersHidden)
    }

    return (
        <div className={`users-block ${isUsersHidden && "users-hidden"} `}>
            <div className="users-rod">
                <div 
                    className={`users-rod__ball ${isUsersHidden && "users-rod__ball-right"}`} 
                    onClick={ballClickHandler}
                ></div>
            </div>
            
            <div className="users-ring left-r"></div>
            <div className="users-ring right-r"></div>
                
            <div className="users-block__body">
                <div className="users-block__top">
                    <div className="users-block__hole"></div>
                    <div className="users-block__hole" ></div>
                </div>
                
                <div className="users-block__content">
                    {props.children} 
                </div>
            </div>
        </div>
        
    )
}

export default UsersBlock;