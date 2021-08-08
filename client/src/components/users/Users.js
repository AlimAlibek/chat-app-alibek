import { useSelector } from "react-redux";
import "./users.css"

import UsersBlock from "./UsersBlock";
import UsersList from "./UsersList";


function Users() {
    const currentRoom = useSelector(state => state.users.currentRoom)

    return (
            <UsersBlock>
                <div className="users-title">Участники | Комната {currentRoom}</div>
                <UsersList/>
            </UsersBlock>
    )
}

            export default Users;