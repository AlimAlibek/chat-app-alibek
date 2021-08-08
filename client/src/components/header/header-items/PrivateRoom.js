import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import HeaderItem from "./HeaderItem";

import { socket } from "../../../socket";

function PrivateRoom({onClick}) {
    const [phase, setPhase] = useState("none");
    const newRoom = useSelector(state => state.private.room);
    useEffect(() => {
        if (newRoom) {
            setPhase(newRoom)
        }
    }, [newRoom]);
    return (
        <HeaderItem position="create-room">
            <div className="header-item__content" >

                {phase === "none" ? 
                    <div onClick={() => setPhase("create")}>
                        Приватная комната
                    </div >
                : phase === "create" ? 
                    <CreateRoom setPhase={setPhase}/>
                :
                    <div onClick={() => onClick(phase)}>
                        Приватная комната {phase}  
                    </div>
                }
            </div>
        </HeaderItem>
    )
}

export default PrivateRoom;


function CreateRoom() {
    const [number, setNumber] = useState("");
    const id = useSelector(state => state.users.currentUser.id);
    const room = useSelector(state => state.users.currentRoom);

    const inputHandler = e => {
        setNumber(e.target.value);
    }
    const submitHandler = e => {
        e.preventDefault();

        socket.emit("CREATE_ROOM", {room: number, currentRoom: room, id})
    }
    return (
        <form className="create-room" onSubmit={submitHandler}>
            <input type="number" 
                min="4" max="999" 
                placeholder="номер..."  
                onChange={inputHandler}
                value={number}
                required={true}
            />  
            <button>войти</button>
        </form>
    )
}