import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./header/Header";
import Users from "./users/Users";
import MessagesBlock from "./messages/MessagesBlock";
import Footer from "./footer/Footer";

import { socket } from "../socket";
import { newMessage, roomChange, usersChange, createRoom, privateUsersChange, sendingMessage} 
    from "../redux/action/actions";


function Main() {
    const id = useSelector(state => state.users.currentUser.id);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("NEW_MESSAGE", ({message, room}) => {
            if (message.authorId === id) {
                dispatch(sendingMessage(null));
            }
            dispatch(newMessage(room, message))
        });

        socket.on("ROOM_CHANGE_RES", ({users, usersAmount, privateUsers, room}) => { 
            console.log("room ch res .. " + JSON.stringify(users))
            dispatch(roomChange(room));
            dispatch(usersChange(users, usersAmount));
            if (privateUsers) {
                dispatch(privateUsersChange(privateUsers));
            }
            localStorage.setItem("userDataForChat", JSON.stringify({id, room}))
        });

        socket.on("USERS_CHANGE", ({users, usersAmount}) => {
            console.log("socket on users change _ " + usersAmount);
            dispatch(usersChange(users, usersAmount));
        });

        socket.on("CREATE_ROOM_RES", ({users, privateUsers, usersAmount, room}) => {
            console.log("createRoom res .. " + JSON.stringify(users))
            dispatch(newMessage(room));
            dispatch(createRoom(privateUsers, room));
            dispatch(roomChange(room));
            dispatch(usersChange(users, usersAmount))
            localStorage.setItem("userDataForChat", JSON.stringify({id, room}))
        });

        socket.on("PRIVATE_USERS_CHANGE", ({privateUsers}) => {
            dispatch(privateUsersChange(privateUsers))
        })
        
    }, [dispatch, id]);


    return (
        <div>
            <Header />
            <Users />
            <MessagesBlock />
            <Footer />
        </div>
    )
}

export default Main;