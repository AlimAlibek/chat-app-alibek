
import HeaderItem from "./HeaderItem";

function Logo({user}) {
    return (
        <HeaderItem position="logo" >
            <div className="header-item__content">
                <img src={user.avatar} alt="logo" />
                <div>{user.name}</div>
            </div>  
        </HeaderItem>
    )
}

export default Logo;