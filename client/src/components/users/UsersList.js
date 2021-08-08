import {useSelector} from "react-redux";

function UsersList() {
    const currentRoom = useSelector(state => state.users.currentRoom);
    const publick = useSelector(state => state.users.users);
    const privateUsers = useSelector(state => state.private.users)
    let users;
    if (currentRoom > 3) {
        users = privateUsers;
    } else {
        users = publick;
    }
 
    return (
        <ul className="users-list">
            {
                users.map(user => {
                    return (
                        <li className="user-card" key={user.name}>
                            <div className="user-card__avatar">
                                <img src={user.avatar} alt="avatar"/>
                            </div>
                            <div className="user-card__name">
                                <p>{user.name}</p>
                            </div>
                            {user.online && <small>online</small>}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UsersList;