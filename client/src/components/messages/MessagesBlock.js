import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./messages.css"
import MessagesList from "./MessagesList"

function MessagesBlock() {
    const currentRoom = useSelector(state => state.users.currentRoom);
    const [roomUpdate, setRoomUpdate] = useState(true);
    useEffect(() => {
        setRoomUpdate(!roomUpdate)
    }, [currentRoom])
    return(
        <div className={`messages-block ${roomUpdate ? "from-top1" : "from-top2"}`}>
            <MessagesList />
        </div>
    )
}

export default MessagesBlock;