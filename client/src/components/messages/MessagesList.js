
import { useSelector } from "react-redux";
import MessageCard from "./MessageCard";


function MessagesList() {

    const room = useSelector(state => state.users.currentRoom);
    const messages = useSelector(state => state.messages[room]);
    const id = useSelector(state => state.users.currentUser.id);
    const sending = useSelector(state => state.messages.sendingMessage);

    return(
        <ul className="messages-list">
            {   
                messages.length !== 0 ?
                    messages.map(message => {
                        return < MessageCard 
                            message={message} 
                            key={message.id}
                            own={id === message.authorId ? true : false}
                        />
                    })
                : 
                    !sending && <div className="no-message">СООБЩЕНИЙ НЕТ</div>
            }
            {
                sending && <MessageCard 
                    message={sending}
                    own={true}
                />
            }
            
        </ul>
    )
}

export default MessagesList;