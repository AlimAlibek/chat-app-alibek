
import { useSelector } from "react-redux";
import "./header-items.css"

import { socket } from "../../../socket";

import Logo from "./Logo";
import Room from "./Room";
import PrivateRoom from "./PrivateRoom";

const initialRooms = {
    1: 0, 2: 0, 3: 0
}

function HeaderItems() {
    const currentUser = useSelector(state => state.users.currentUser);
    const usersAmount = useSelector(state => state.users.usersAmount);
    const currentRoom = useSelector(state => state.users.currentRoom);

    const rooms = usersAmount || initialRooms;

    const itemClickHandler = room => {
        if (room === currentRoom) {
            return;
        }
        socket.emit("ROOM_CHANGE", {room, currentRoom, id: currentUser.id})
    }

    return (
        <div className="header__items">
            <Logo user={currentUser}/>
            
            {Object.keys(rooms).map(room => {    
                return <Room 
                    room={room} 
                    participants={rooms[room]} 
                    key={room} 
                    onClick={itemClickHandler}
                />
            })}

            <PrivateRoom onClick={itemClickHandler}/>
            
        </div>
    )
}

export default HeaderItems;
