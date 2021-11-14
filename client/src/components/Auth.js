import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "./loader/Loader";
import { socket } from "../socket";
import { connect, createRoom, newMessage, throwError, setLoader} from "../redux/action/actions";
import {sources} from "../images/avatarSoursec";

function Auth({setUser}) {
    const [name, setName] = useState("");
    const [avatarIndex, setAvatarIndex] = useState(null);
    const [noAvatar, setNoAvatar] = useState(false);
    
    const loading = useSelector(state => state.loading.loading);
    const error = useSelector(state => state.error.error);
    const dispatch = useDispatch();

    const inputHandler = e => {
        setName(e.target.value);
        if (error) {
            dispatch(throwError(""))
        }  
    }

    const imgClickHandler = index => {
        setAvatarIndex(index);
        setNoAvatar(false);
    }

    const submitHandler = e => {
        e.preventDefault();
        if (avatarIndex === null) {
            return setNoAvatar(true);
        }
        if (!name.trim().length) {
            return;
        }

        const newUser = { name, avatar: sources[avatarIndex] }
        socket.emit("AUTH", {newUser, room: "1"});
        dispatch(setLoader(true));
    }

    useEffect(() => {
        const userData = localStorage.getItem("userDataForChat");
        if (userData) {
            socket.emit("LOGIN", JSON.parse(userData));
            dispatch(setLoader(true));
        }
    }, [])


    useEffect(() => {
        socket.on("LOGIN_RES", ({user, users, privateUsers, usersAmount, room}) => {
            const userData = {id: user.id, room}
            localStorage.setItem("userDataForChat", JSON.stringify(userData));
            
            if (privateUsers) {
                dispatch(newMessage(room));
                dispatch(createRoom(privateUsers, room));
            }
            dispatch(connect(user, users, usersAmount, room));
            dispatch(setLoader(false));
            setUser(user);
        });
        
    }, [dispatch, setUser])

    console.log(sources);
    return (
        !loading  ?

        <div className="auth">
            <form onSubmit={submitHandler}>
                <input 
                    onInput={inputHandler} 
                    value={name} 
                    required={true}
                    placeholder="введите имя ..."
                />
                <div className="avatar-choose-container">
                    <div className={noAvatar ? "avatar-alert" : undefined} >выберите аватарку</div>
                    {
                        sources.map((source, index) => {
                           return <img 
                            src={source} 
                            alt="avatarChoose" 
                            onClick={() => imgClickHandler(index)}
                            className={avatarIndex === index ? "chosen" : null}  
                            key={source}
                        />
                        })
                    }
                </div>
                <button type="submit">войти</button>
            </form>
        </div>
        :
        <Loader />
    )
}

export default Auth;