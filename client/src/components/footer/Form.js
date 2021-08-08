import picture from "../../images/addPicture.png"
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import { sendingMessage } from "../../redux/action/actions";
import {socket} from "../../socket";

function Form() {
    const user = useSelector(state => state.users.currentUser);
    const room = useSelector(state => state.users.currentRoom);

    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const dispatch = useDispatch();

    const inputHandler = e => {
        setText(e.target.value);
    }

    const addImageHandler = e => {
        if (e.target.files.length === 0) {
            return setImage("");
        }
        const reader = new FileReader();
        reader.onload = event => {
            setImage(event.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const submitHandler = e => {
        e.preventDefault();
        if (text.trim().length === 0 && !image) {
            return;
        }
        const message = {
            text, image, 
            author: user.name, 
            authorAvatar: user.avatar,
            authorId: user.id, 
            id: Date.now()
        }
        
        socket.emit("SEND_MESSAGE", {message, room});
        dispatch(sendingMessage({...message, text: "Отправка ....."}));

        setText("");
        setImage("");
    }


    return(
        <form onSubmit={submitHandler}>
            <div className="input-container">
               <input onChange={inputHandler} value={text} placeholder="сообщение..."/> 
               <label>
                  <img src={picture} alt="add-file" /> 
                  <input type="file" onChange={addImageHandler} accept=".png, .jpg"/>
               </label> 
               {
                   image && <div className="send-image"><img src={image} alt="send icon"/></div>
               }
            </div>
            <button>send</button>
        </form>
    )
}

export default Form;